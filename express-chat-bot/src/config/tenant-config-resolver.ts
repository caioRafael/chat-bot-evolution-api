export interface TenantEvolutionConfig {
  baseUrl: string;
  apiKey: string;
}

type TenantOverride = {
  baseUrl?: string;
  apiKey?: string;
};

function parseTenantsJson(raw: string | undefined): Record<string, TenantOverride> {
  if (!raw?.trim()) {
    return {};
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    return parsed as Record<string, TenantOverride>;
  } catch {
    console.warn("[TENANT CONFIG] EVOLUTION_TENANTS_JSON inválido; ignorando overrides.");
    return {};
  }
}

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

export class TenantConfigResolver {
  private readonly overrides: Record<string, TenantOverride>;
  private readonly defaultBaseUrl: string;
  private readonly defaultApiKey: string | undefined;

  constructor(env: Record<string, string | undefined> = process.env) {
    this.overrides = parseTenantsJson(env.EVOLUTION_TENANTS_JSON);
    this.defaultBaseUrl = trimTrailingSlash(env.EVOLUTION_BASE_URL ?? "http://localhost:8080");
    this.defaultApiKey = env.EVOLUTION_API_KEY;
  }

  resolve(instance: string): TenantEvolutionConfig | null {
    const override = this.overrides[instance];
    const baseUrl = trimTrailingSlash(override?.baseUrl ?? this.defaultBaseUrl);
    const apiKey = override?.apiKey ?? this.defaultApiKey;

    if (!apiKey) {
      console.warn(
        `[TENANT CONFIG] Sem EVOLUTION_API_KEY (e sem override em EVOLUTION_TENANTS_JSON) para instância "${instance}".`,
      );
      return null;
    }

    return { baseUrl, apiKey };
  }
}
