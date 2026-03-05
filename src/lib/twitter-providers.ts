import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { getCommonRemarkPlugins, type TocHeading } from "@/lib/markdown";
import { reviewMdxComponents } from "@/components/Reviews/ReviewMDXComponents";

const PROVIDERS_DIR = path.join(process.cwd(), "src", "content", "twitter-providers");

const PROVIDER_ORDER = ["useviral", "twesocial", "followersup"];

export type ProviderFrontmatter = {
  title: string;
  slug?: string;
  date: string;
  excerpt?: string;
  image?: string;
  badge?: string;
  badgeClass?: string;
  tags?: string[];
  rating?: number;
  ratings?: Record<string, number>;
  pros?: Array<{ title: string; description: string }>;
  cons?: Array<{ title: string; description: string }>;
  pricing?: string;
  website?: string;
};

export type ProviderSummary = Required<Pick<ProviderFrontmatter, "title" | "date">> & {
  slug: string;
  excerpt: string;
  image?: string;
  badge?: string;
  badgeClass?: string;
  rating?: number;
  pros?: Array<{ title: string; description: string }>;
  cons?: Array<{ title: string; description: string }>;
  pricing?: string;
  website?: string;
};

export type ProviderArticle = ProviderSummary & {
  content: React.ReactElement;
  headings: TocHeading[];
  rating?: number;
  ratings?: ProviderFrontmatter["ratings"];
  rawContent?: string;
  pros?: ProviderFrontmatter["pros"];
  cons?: ProviderFrontmatter["cons"];
};

function findFileForSlug(slug: string): string | null {
  const direct = path.join(PROVIDERS_DIR, `${slug}.mdx`);
  if (fs.existsSync(direct)) return direct;
  const files = getAllProviderFiles();
  for (const file of files) {
    const raw = fs.readFileSync(path.join(PROVIDERS_DIR, file), "utf8");
    const { data } = matter(raw);
    const fm = data as ProviderFrontmatter;
    const fileSlug = fm.slug || file.replace(/\.mdx$/, "");
    if (fileSlug === slug) return path.join(PROVIDERS_DIR, file);
  }
  return null;
}

function readFile(slugOrFile: string): { filePath: string; raw: string } {
  let filePath: string | null = null;
  if (slugOrFile.endsWith(".mdx")) {
    filePath = path.join(PROVIDERS_DIR, slugOrFile);
  } else {
    filePath = findFileForSlug(slugOrFile);
  }
  if (!filePath) throw new Error(`Provider not found: ${slugOrFile}`);
  const raw = fs.readFileSync(filePath, "utf8");
  return { filePath, raw };
}

export function getAllProviderFiles(): string[] {
  if (!fs.existsSync(PROVIDERS_DIR)) return [];
  return fs.readdirSync(PROVIDERS_DIR).filter((f) => f.endsWith(".mdx")).sort();
}

export function getAllProviderSummaries(): ProviderSummary[] {
  const files = getAllProviderFiles();
  const map = new Map<string, ProviderSummary>();
  for (const file of files) {
    const raw = fs.readFileSync(path.join(PROVIDERS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const fm = data as ProviderFrontmatter;
    const slugFromFile = file.replace(/\.mdx$/, "");
    const slug = fm.slug || slugFromFile;
    map.set(slug, {
      slug,
      title: fm.title ?? slug,
      date: fm.date ?? new Date().toISOString(),
      excerpt: fm.excerpt ?? content.slice(0, 180),
      image: fm.image,
      badge: fm.badge,
      badgeClass: fm.badgeClass,
      rating: fm.rating,
      pros: fm.pros,
      cons: fm.cons,
      pricing: fm.pricing,
      website: fm.website,
    });
  }
  const ordered: ProviderSummary[] = [];
  for (const slug of PROVIDER_ORDER) {
    const s = map.get(slug);
    if (s) ordered.push(s);
  }
  for (const [slug, s] of map) {
    if (!PROVIDER_ORDER.includes(slug)) ordered.push(s);
  }
  return ordered;
}

export async function getProviderBySlug(slug: string): Promise<ProviderArticle | null> {
  try {
    const { raw } = readFile(slug);
    const headings: TocHeading[] = [];
    const { content: rawContentText } = matter(raw);
    const { content, frontmatter } = await compileMDX<ProviderFrontmatter>({
      source: raw,
      options: {
        parseFrontmatter: true,
        mdxOptions: { remarkPlugins: getCommonRemarkPlugins(headings) },
      },
      components: reviewMdxComponents,
    });
    const fm = frontmatter as ProviderFrontmatter;
    const summary: ProviderSummary = {
      slug: fm.slug || slug,
      title: fm.title || slug,
      date: fm.date || new Date().toISOString(),
      excerpt: fm.excerpt || "",
      image: fm.image,
      badge: fm.badge,
      badgeClass: fm.badgeClass,
      rating: fm.rating,
      pros: fm.pros,
      cons: fm.cons,
      pricing: fm.pricing,
      website: fm.website,
    };
    return {
      ...summary,
      content,
      headings,
      rating: fm.rating,
      ratings: fm.ratings,
      rawContent: rawContentText,
      pros: fm.pros,
      cons: fm.cons,
    };
  } catch {
    return null;
  }
}
