import { getReq } from "./config"

export const LOCATIONS = {
  getList: async () => { return await getReq('localizações', 'locations') }
}