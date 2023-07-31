import $api from "../http";
import { Calculation } from "./client-session";

export interface Cluster {
  ID: number;
  calculation: Calculation;
  topic: number;
  name: string;
  size: number;
}

export class ClusterService {
  static async getClusters(): Promise<Cluster[] | undefined> {
    const resp = await $api.get('/cluster/all')
    return resp?.data
  }

  static async clusterByCalculationId(calculationId: number): Promise<Cluster[] | undefined> {
    if (!calculationId) return
    const resp = await $api.get(`/cluster/by-calculation-id/${calculationId}`)
    return resp?.data
  }

  static async getClusterList(params?: URLSearchParams): Promise<[Cluster[], number] | undefined> {
    const resp = await $api.get(`/cluster${ params ? `?${params}` : '' }`)
    return resp?.data
  }
}
