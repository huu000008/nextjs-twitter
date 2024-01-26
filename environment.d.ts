declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NAVER_CLIENT_ID: string
    readonly NAVER_CLIENT_SECRET: string

    readonly KAKAO_CLIENT_ID: string
    readonly KAKAO_CLIENT_SECRET: string

    readonly GOOGLE_CLIENT_ID: string
    readonly GOOGLE_CLIENT_SECRET: string

    readonly APPLE_ID: string
    readonly APPLE_TEAM_ID: string
    readonly APPLE_SECRET: string
  }
}