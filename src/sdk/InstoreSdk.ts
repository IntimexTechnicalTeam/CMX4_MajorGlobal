import { ProductApi } from './api/ProductApi';
import { ShoppingCartApi } from './api/ShoppingCartApi';
import storage from './common/Storage';
import { MemberApi } from './api/MemberApi';
import { CmsApi } from './api/CmsApi';
import { PromotionApi } from './api/PromotionApi';
import { CheckoutApi } from './api/CheckoutApi';
import { OrderApi } from './api/OrderApi';
import { AddressApi } from './api/AddressApi';
import { PaymentApi } from './api/PaymentApi';
// import { PromotionApi } from "./promotionApi";
// import { CustomerServiceApi } from "./customerServiceApi";
import { DeliveryApi } from './api/DeliveryApi';
import { ApiVersion } from './common/SysConst';
import { MessageApi } from './api/MessageApi';
import { PointsApi } from './api/PointsApi';
import { ProdAttrApi } from './api/ProdAttrApi';
import { CommentsApi } from './api/CommentsApi';
import { CalendarApi } from './api/CalendarApi';
import RegAndPayApi from './api/RegAndPayApi';
import { IPAddress } from './api/IPAddress';
import PhotoAlbumApi from './api/PhotoAlbumApi';

export class Api {
public product: ProductApi ;
public shoppingCart: ShoppingCartApi ;
public checkout: CheckoutApi;
public order: OrderApi;
public address: AddressApi;
public paymentApi: PaymentApi;
public messageApi: MessageApi;
public promotion: PromotionApi;
public delivery: DeliveryApi;
public member: MemberApi;
public cms: CmsApi | undefined;
public pointsApi: PointsApi;
public prodAttrApi: ProdAttrApi;
public comments: CommentsApi;
public regAndPay: RegAndPayApi;
public calendar: CalendarApi;
public ipAddress: IPAddress;
public PhotoAlbum: PhotoAlbumApi;
// customerService: CustomerServiceApi | undefined;

// shoppingCart: ShoppingCartApi | undefined;

// promotion: PromotionApi | undefined;
// customerService: CustomerServiceApi | undefined;
// delivery: DeliveryApi | undefined;
// member: MemberApi | undefined;
// shoppingCart: ShoppingCartApi | undefined;
// cms: CMSApi | undefined;
// order: OrderApi | undefined;
// payment: PaymentApi | undefined;
// message: MessageApi | undefined;
// prodcomment: ProdCommentApi | undefined;
// uploadfile: UploadFileApi | undefined;
// merchant: MerchantApi | undefined;
// custom: CustomApi | undefined;
// regnpay: RegNPayApi | undefined;
// braDesign: BraDesignApi | undefined;
// points: PointsApi | undefined;
// file: FileApi | undefined;
// recommendProduct: RecommendProductApi | undefined;
constructor () {
  this.product = ProductApi.getInstance();
  this.shoppingCart = ShoppingCartApi.getInstance();
  this.checkout = CheckoutApi.getInstance();
  this.order = OrderApi.getInstance();
  this.address = AddressApi.getInstance();
  this.paymentApi = PaymentApi.getInstance();
  this.member = MemberApi.getInstance();
  this.cms = CmsApi.getInstance();
  this.promotion = PromotionApi.getInstance();
  // this.member = new MemberApi();
  this.promotion = new PromotionApi();
  this.delivery = DeliveryApi.getInstance();
  this.messageApi = MessageApi.getInstance();
  this.pointsApi = PointsApi.getInstance();
  this.comments = CommentsApi.getInstance();
  this.prodAttrApi = new ProdAttrApi();
  this.regAndPay = RegAndPayApi.getInstance();
  this.calendar = CalendarApi.getInstance();
  this.ipAddress = IPAddress.getInstance();
  this.PhotoAlbum = PhotoAlbumApi.getInstance();
}

  // private _prodAttr: ProdAttrApi | undefined;
  // public get prodAttr(): ProdAttrApi {
  //   if (this._prodAttr == null) {
  //     this._prodAttr = new ProdAttrApi();
  //   }
  //   return this._prodAttr;
  // }
  // public set prodAttr(v: ProdAttrApi) {
  //   this._prodAttr = v;
  // }
}

export class InstoreSdk {
  ver: string;
  public api: Api;
  // message: Message;

  constructor () {
    this.ver = ApiVersion;
    this.api = new Api();
    // this.api.product = new ProductApi();
    // this.api.promotion = new PromotionApi();
    // this.api.customerService = new CustomerServiceApi();
    // this.api.member = new MemberApi();
    // this.api.merchant = new MerchantApi();
    // this.api.delivery = new DeliveryApi();
    // this.api.shoppingCart = new ShoppingCartApi();
    // this.api.cms = new CMSApi();
    // this.api.order = new OrderApi();
    // this.api.payment = new PaymentApi();
    // this.api.message = new MessageApi();
    // this.api.prodcomment = new ProdCommentApi();
    // this.api.uploadfile = new UploadFileApi();
    // this.message = this.createMessage();
    // this.api.custom = new CustomApi();
    // this.api.regnpay = new RegNPayApi();
    // this.api.braDesign = new BraDesignApi();
    // this.api.points = new PointsApi();
    // this.api.file = new FileApi();
    // this.api.recommendProduct = new RecommendProductApi();
    console.log('InstoreSdk inited');
  }
  isLogin (): boolean {
    var logined = storage.get('logined');
    return logined === '1';
  }

  // private createMessage(): Message {
  //   var lang = storage.get("uLanguage");
  //   switch (lang) {
  //     case "E":
  //       return new EnMessage();
  //     case "C":
  //       return new HKMessage();
  //     case "S":
  //       return new CNMessage();
  //     default:
  //       return new EnMessage();
  //   }
  // }
}

let SDK = new InstoreSdk();
export default SDK;
