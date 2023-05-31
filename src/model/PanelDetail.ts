import ProductAttr from './ProductAttr';
import Button from './Button';
import Currency from './currency';
import Catelog from './catalog';
export default class PanelDetail {
  private _Sku : string;
  public get Sku () : string {
    return this._Sku;
  }
  public set Sku (v : string) {
    this._Sku = v;
  }
  private _Name : string;
  public get Name () : string {
    return this._Name;
  }
  public set Name (v : string) {
    this._Name = v;
  }
  /**
   * @param _overView 可选
   */
  private _OverView : string;
  public get OverView () : string {
    return this._OverView;
  }
  public set OverView (v : string) {
    this._OverView = v;
  }
  private _Detail : string;
  public get Detail () : string {
    return this._Detail;
  }
  public set Detail (v : string) {
    this._Detail = v;
  }

  private _Specification : string;
  public get Specification () : string {
    return this._Specification;
  }
  public set Specification (v : string) {
    this._Specification = v;
  }

  private _Code : string;
  public get Code () : string {
    return this._Code;
  }
  public set Code (v : string) {
    this._Code = v;
  }
  private _ListPrice : number;
  public get ListPrice () : number {
    return this._ListPrice;
  }
  public set ListPrice (v : number) {
    this._ListPrice = v;
  }
  private _SalePrice : number;
  public get SalePrice () : number {
    return this._SalePrice;
  }
  public set SalePrice (v : number) {
    this._SalePrice = v;
  }
  private _AttrList : ProductAttr[][];
  public get AttrList () : ProductAttr[][] {
    return this._AttrList;
  }
  public set AttrList (v : ProductAttr[][]) {
    this._AttrList = v;
  }
  private _ExtAttrList : ProductAttr[][];
  public get ExtAttrList () : ProductAttr[][] {
    return this._ExtAttrList;
  }
  public set ExtAttrList (v : ProductAttr[][]) {
    this._ExtAttrList = v;
  }
  private _ProductStatus : number;
  public get ProductStatus () : number {
    return this._ProductStatus;
  }
  public set ProductStatus (v : number) {
    if (v === undefined || v === null) v = -1;
    if (v === 0) { this.button = [new Button('addToCart', 'positive', 'large', 'addToCart'), new Button('buyNow', 'nagative', 'large', 'buy')]; } else if (v === 1) { this.button = [new Button('offSale', 'positive', 'large', 'offSale'), new Button('favorite', 'nagative', 'large', 'favorite')]; } else if (v === 2) { this.button = [new Button('SaleOut', 'positive', 'large', 'SaleOut'), new Button('favorite', 'nagative', 'large', 'favorite')]; } else if (v === 3) { this.button = [new Button('purchasing', 'positive', 'large', 'Purchasing'), new Button('notifyMe', 'nagative', 'large', 'notifyMe')]; }
    this._ProductStatus = v;
  }

  private _Currency : Currency;
  public get Currency () : Currency {
    return this._Currency;
  }
  public set Currency (v : Currency) {
    this._Currency = v;
  }

  private _MinPurQty : number;
  public get MinPurQty () : number {
    return this._MinPurQty;
  }
  public set MinPurQty (v : number) {
    this._MinPurQty = v;
  }

  private _MaxPurQty : number;
  public get MaxPurQty () : number {
    return this._MaxPurQty;
  }
  public set MaxPurQty (v : number) {
    this._MaxPurQty = v;
  }
  private _CatId : number;
  public get CatId () : number {
    return this._CatId;
  }
  public set CatId (v : number) {
    this._CatId = v;
  }

  private _CatalogTree : Catelog[];
  public get CatalogTree () : Catelog[] {
    return this._CatalogTree;
  }
  public set CatalogTree (v : Catelog[]) {
    this._CatalogTree = v;
  }
  private _IsFavorite : boolean;
  public get IsFavorite () : boolean {
    return this._IsFavorite;
  }
  public set IsFavorite (v : boolean) {
    this._IsFavorite = v;
  }

  private _Score : number;
  public get Score () : number {
    return this._Score;
  }
  public set Score (v : number) {
    this._Score = v;
  }
  public button: Button[] = [];
  constructor (sku:string, name:string, code:string, listPrice:number, salePrice:number, overView:string = '', Detail:string = '', Specification:string = '', attrList:ProductAttr[][] = [], extAttrList:ProductAttr[][] = [], productStatus:number = 3, currency:Currency = new Currency(), _MaxPurQty:number = 0, _MinPurQty:number = 1, _CatId = 0, _CatalogTree = [], _IsFavorite:boolean = false, _Score:number = 0) {
    this._Name = name;
    this._Sku = sku;
    this._Code = code;
    this._ListPrice = listPrice;
    this._SalePrice = salePrice;
    this._ProductStatus = productStatus;
    this._OverView = overView;
    this._Detail = Detail;
    this._Specification = Specification;
    this._AttrList = attrList;
    this._ExtAttrList = extAttrList;
    this._Currency = currency;
    this._MaxPurQty = _MaxPurQty;
    this._MinPurQty = _MinPurQty;
    this._CatId = _CatId;
    this._CatalogTree = _CatalogTree;
    this._IsFavorite = _IsFavorite;
    this._Score = _Score;
  }
}
