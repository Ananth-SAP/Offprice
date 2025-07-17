using { offprice.db as my  } from '../db/schema';
service offprice_srv{
  entity GenericMaterial as projection on my.GenericMaterial;
  entity SizeMaterial as projection on my.SizeMaterial;
  entity Year as projection on my.Year;
  entity Month as projection on my.Month;
  entity Seq as projection on my.Seq;
  entity Brand as projection on my.Brand;
  entity Gender as projection on my.Gender;
  entity Segment as projection on my.Segment;
  entity Size as projection on my.Size;
}
