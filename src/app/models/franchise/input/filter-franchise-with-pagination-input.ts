export class FilterFranchiseWithPaginationInput {
    TypeSortPrice: string = "";
    IsGarant: boolean = false;
    MinProfit: number = 0;
    MaxProfit: number = 0;
    ViewCode: string = "";
    CategoryCode: string = "";    
    MinInvest: number = 0;
    MaxInvest: number = 0;
    PageNumber: number = 1;
    CountRows: number = 12;
}