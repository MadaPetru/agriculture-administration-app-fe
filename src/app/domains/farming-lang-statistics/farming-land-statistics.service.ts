import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  FarmingLandStatisticsProfitabilityPerYearResponse
} from "./dto/response/farming-land-statistics-profitability-per-year-response";
import {
  FarmingLandStatisticsProfitabilityPerOperationAndYearResponse
} from "./dto/response/farming-land-statistics-profitability-per-operation-and-year-response";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FarmingLandStatisticsService {

  PROFITABILITY_PER_YEAR_URL = environment.apiUrl + '/v1/farming-lands/statistics/profitability/from/year/{startYear}/to/year/{endYear}';
  PROFITABILITY_PER_OPERATION_AND_YEAR_URL = environment.apiUrl + '/v1/farming-lands/statistics/operations/types/profitability/from/year/{startYear}/to/year/{endYear}';
  PROFITABILITY_PER_YEAR_URL_FOR_FARMING_LAND = environment.apiUrl + '/v1/farming-lands/statistics/farming-land/{farmingLandId}/profitability/from/year/{startYear}/to/year/{endYear}';
  PROFITABILITY_PER_OPERATION_AND_YEAR_URL_FOR_FARMING_LAND = environment.apiUrl + '/v1/farming-lands/statistics/farming-land/{farmingLandId}/operations/types/profitability/from/year/{startYear}/to/year/{endYear}';

  constructor(
    private http: HttpClient) {
  }

  profitabilityPerYear(createdBy: string, startYear: number, endYear: number): Observable<FarmingLandStatisticsProfitabilityPerYearResponse[]> {
    let request = {createdBy: createdBy};
    let url = this.PROFITABILITY_PER_YEAR_URL.replace("{startYear}", String(startYear)).replace("{endYear}", String(endYear));
    return this.http.post<FarmingLandStatisticsProfitabilityPerYearResponse[]>(url, request);
  }

  profitabilityPerYearAndOperation(createdBy: string, startYear: number, endYear: number): Observable<FarmingLandStatisticsProfitabilityPerOperationAndYearResponse[]> {
    let request = {createdBy: createdBy};
    let url = this.PROFITABILITY_PER_OPERATION_AND_YEAR_URL.replace("{startYear}", String(startYear)).replace("{endYear}", String(endYear));
    return this.http.post<FarmingLandStatisticsProfitabilityPerOperationAndYearResponse[]>(url, request);
  }

  profitabilityPerYearForFarmingLand(createdBy: string, startYear: number, endYear: number, farmingLandId: number): Observable<FarmingLandStatisticsProfitabilityPerYearResponse[]> {
    let request = {createdBy: createdBy};
    let url = this.PROFITABILITY_PER_YEAR_URL_FOR_FARMING_LAND.replace("{startYear}", String(startYear)).replace("{endYear}", String(endYear)).replace("{farmingLandId}", String(farmingLandId));
    return this.http.post<FarmingLandStatisticsProfitabilityPerYearResponse[]>(url, request);
  }

  profitabilityPerYearAndOperationForFarmingLand(createdBy: string, startYear: number, endYear: number, farmingLandId: number): Observable<FarmingLandStatisticsProfitabilityPerOperationAndYearResponse[]> {
    let request = {createdBy: createdBy};
    let url = this.PROFITABILITY_PER_OPERATION_AND_YEAR_URL_FOR_FARMING_LAND.replace("{startYear}", String(startYear)).replace("{endYear}", String(endYear)).replace("{farmingLandId}", String(farmingLandId));
    return this.http.post<FarmingLandStatisticsProfitabilityPerOperationAndYearResponse[]>(url, request);
  }
}
