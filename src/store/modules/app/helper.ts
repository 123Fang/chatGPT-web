import { ss } from '@/utils/storage'

const LOCAL_NAME = 'appSetting'

export type Theme = 'light' | 'dark' | 'auto'


/**
 *  侧边展开
 *  主题
 * 
 * **/
export interface AppState {
  siderCollapsed: boolean
  theme: Theme
}

export function defaultSetting(): AppState {
  return { siderCollapsed: false, theme: 'dark' }
}

export function getLocalSetting(): AppState {
  const localSetting: AppState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalSetting(setting: AppState): void {
  ss.set(LOCAL_NAME, setting)
}
