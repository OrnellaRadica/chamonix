export interface ReducedProduct {
  id: number;
  title: string;
  body_html?: any;
  variants: Variant[];
  options: Option[];
  images: Image[];
}


export interface Product {
  id: number;
  title: string;
  body_html?: any;
  vendor: string;
  product_type: string;
  created_at: string;
  handle: string;
  updated_at: string;
  published_at: string;
  template_suffix?: any;
  status: string;
  published_scope: string;
  tags: string;
  admin_graphql_api_id: string;
  variants: Variant[];
  options: Option[];
  images: Image[];
  image: Image | null;
}

interface Image {
  id: number;
  product_id: number;
  position: number;
  created_at: string;
  updated_at: string;
  alt: string;
  width: number;
  height: number;
  src: string;
  variant_ids: any[];
  admin_graphql_api_id: string;
}

interface Option {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
}

export interface Variant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  sku: string;
  position: number;
  inventory_policy: string;
  compare_at_price?: any;
  fulfillment_service: string;
  inventory_management?: any;
  option1: string;
  option2?: any;
  option3?: any;
  created_at: string;
  updated_at: string;
  taxable: boolean;
  barcode?: any;
  grams: number;
  image_id?: any;
  weight: number;
  weight_unit: string;
  inventory_item_id: number;
  inventory_quantity: number;
  old_inventory_quantity: number;
  requires_shipping: boolean;
  admin_graphql_api_id: string;
}