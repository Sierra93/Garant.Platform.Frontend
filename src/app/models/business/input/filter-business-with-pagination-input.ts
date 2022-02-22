export class FilterBusinessWithPaginationInput {
    TypeSortPrice: string = "";
    IsGarant: boolean = false;
    MinProfit: number = 0;
    MaxProfit: number = 0;
    City: string ="";
    CategoryCode: string = "";    
    MinPrice: number = 0;
    MaxPrice: number = 0;
    PageNumber: number = 1;
    CountRows: number = 12;
}