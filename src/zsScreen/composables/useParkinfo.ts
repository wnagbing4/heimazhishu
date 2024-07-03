import { getParkInfoApi } from '@/Visualization/api/park/park'
import type { ParkInfoParamsType } from '@/Visualization/api/park/parkType'
import { ref } from 'vue'

export const useParkinfo = () => {
  const ParkInfo = ref<ParkInfoParamsType>()
  const getParkInfo = async () => {
    try {
      const res = await getParkInfoApi()
      ParkInfo.value = res.data;
    } catch (error) {
      console.log(error)
    }
  }
  return {
    ParkInfo,
    getParkInfo
  }
}
