namespace offprice.db;

entity GenericMaterial {
    key YEAR              : String(4);
    key MONTH             : String(2);
    key MATERIAL          : String(40);
        STYLE_DESCRIPTION : String(50);
        Color:String(20);
        DCMap:String(4);
        DCDesc:String(15);
        atsstock:Decimal(23, 2);
        RELEASED_QTY      : Decimal(23, 2);
        ASSIGN_QTY        : Decimal(23, 2);
        BALANCE_QTY        : Decimal(23, 2);
        link:String;
        StyleDesc:String(40);
        SAMPLE            : String(50);
        COMMENTS          : String(50);
        LOWEST_TARGET     : Decimal(23, 2);
        HIGHEST_TARGET     : Decimal(23, 2);
        SAP_PRICE         : Decimal(23, 2);
        APPROVED_PRICE    : Decimal(23, 2);
        LIST:String(10);
        CATAGORY:String(10);
        SEASONYEAR:String(4);
        SSN:String(3);
        BRAND:String(10);
        CUSTOMERGRP:String(20);
        SEGMENT:String(15);
        FITFAMILY:String(20);
        MATGRPDESC:String(15);
        RETAILGRP2:String(10);
        OFFER_QTY        : Decimal(23, 2);
        SEQNO:String(3);
        CUSTOMERNO:String(10);
        CUSTOMERNAME:String(10);
        AGREED_PRICE    : Decimal(23, 2);
        OFFERKTB1:Decimal(23, 2);
        OFFERBUY1:Decimal(23, 2);
        OFFERKTB2:Decimal(23, 2);
        OFFERBUY2:Decimal(23, 2);
        OFFERKTB3:Decimal(23, 2);
        OFFERBUY3:Decimal(23, 2);
        PONUMBER:String(10);
        SHIPTO:String(10);
        RELEASED:String(1);

};

entity SizeMaterial {
    key YEAR              : String(4);
    key MONTH             : String(2);
    key MATERIAL          : String(40);
    key ARTICLE           : String(40);
        STYLE_DESCRIPTION : String(50);
        TOTAL_STK         : Decimal(23, 2);
        RELEASED_QTY      : Decimal(23, 2);
        ASSIGN_QTY        : Decimal(23, 2);

}

entity CustomerRequest {
    key YEAR     : String(4);
    key MONTH    : String(2);
    key MATERIAL : String(40);
    key CUSTOMER : String(10);


}
entity Year{

    key year :String(4);
}
entity Month{

    key ID :String(4);
        Desc:String(20);
}
entity Seq{

    key ID :String(4);

}
entity Brand{

    key ID :String(4);
        Desc:String(20);
}
entity Gender{

    key ID :String(4);
        Desc:String(20);
}
entity Segment{

    key ID :String(4);
        Desc:String(20);
}
entity Size{

    key ID :String(4);
        Desc:String(20);
}