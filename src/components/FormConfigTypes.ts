

// 表单请求参数
export type formDataRequestType = {
  /**
   * 在管面积
   */
  area: number;
  /**
   * 层数
   */
  floors: number;
  /**
   * 楼宇名称
   */
  name: string;
  /**
   * 物业费单价
   */
  propertyFeePrice: number;
  [property: string]: any;
}

// 其他form参数
export type FormResponseType = {
  formItems: FormItem[];
  formRules?: FormRules|any;
  modelValue: formDataRequestType|any;
  formStyleOrigin?: FormStyleOrigin|any;
  footerStyle?: any;
  headerStyle?: any;
}

export type FormItem = {
  field: string;
  itemOrigin: ItemOrigin;
  label: string;
  slotName: string;
  type: string;
  [property: string]: any;
}

export type ItemOrigin = {
  placeholder: string;
  [property: string]: any;
}

export type FormRules = {
  area: Area[];
  floors: Floor[];
  name: Name[];
  propertyFeePrice: PropertyFeePrice[];
  headerStyle?:any;
  footerStyle?:any
  [property: string]: any;
}

export type Area = {
  message: string;
  required?: boolean;
  trigger: string;
  type?: string;
  [property: string]: any;
}

export type Floor = {
  message: string;
  required?: boolean;
  trigger: string;
  type?: string;
  [property: string]: any;
}

export type Name = {
  max?: number;
  message: string;
  min?: number;
  required?: boolean;
  trigger: string;
  [property: string]: any;
}

export type PropertyFeePrice = {
  message: string;
  required?: boolean;
  trigger: string;
  type?: string;
  [property: string]: any;
}

/**
* 校验
*/
export type FormStyleOrigin = {
  "label-position": string;
  "margin-left": string;
  width: string;
  [property: string]: any;
}
