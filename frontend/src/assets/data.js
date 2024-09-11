// popular
import p1_img from './product_1.png'
import p2_img from './product_2.png'
import p3_img from './product_3.png'
import p4_img from './product_4.png'

// latest 
import p5_img from "./product_5.png";
import p6_img from "./product_6.png";
import p7_img from "./product_7.png";
import p8_img from "./product_8.png";
import p9_img from "./product_9.png";
import p10_img from "./product_10.png";
import p11_img from "./product_11.png";
import p12_img from "./product_12.png";

// Footer

import instagram from './instagram.svg'
import twitter from './twitter.svg'
import linkedin from './linkedin.svg'


 const POPULAR = [
  {
    _id: 1,
    name: "Customized Necklace",
    category: "product",
    image: p1_img,
    price: 150.0
  },
  {
    _id: 2,
    name: "Peter Watch",
    category: "product",
    image: p2_img,
    price: 599.0
  
  },
  {
    _id: 3,
    name: "Better together Notebook",
    category: "product",
    image: p3_img,
    price: 300.0
  },
  {
    _id: 4,
    name: "Customized Ceramic Mug ",
    category: "product",
    image: p4_img,
    price: 250.0
  },
];

export default POPULAR;


 const LATEST = [
  {
    _id: 5,
    name: "Customized Hand-Towel with Initial's",
    category: "product",
    image: p5_img,
    price: 550.0
  },
  {
    _id: 6,
    name: "Cutting Board",
    category: "product",
    image: p6_img,
    price: 220.0
  },
  {
    _id: 7,
    name: "Customized Keychain",
    category: "product",
    image: p7_img,
    price: 100.0
  },
  {
    _id: 8,
    name: "Customized Jewellery Box",
    category: "product",
    image: p8_img,
    price: 100.0
  },
  {
    _id: 9,
    name: "Customized Black Tshirt's",
    category: "product",
    image: p9_img,
    price: 200.0
  },
  {
    _id: 10,
    name: "Customized Apron",
    category: "product",
    image: p10_img,
    price: 100.0
  },
  {
    _id: 11,
    name: "Customized Tote Bag",
    category: "product",
    image: p11_img,
    price: 100.0
  },
  {
    _id: 12,
    name: "Floral Letter",
    category: "product",
    image: p12_img,
    price: 85.0
  },
];

export default LATEST;

// FOOTER SECTION
 const FOOTER_LINKS = [
  {
    title: "Learn More",
    links: [
      "About Us",
      "Categories",
      "Exchange Policy",
      "Order Now",
      "FAQ",
      "Privacy Policy",
    ],
  },
  {
    title: "Our Community",
    links: [
      "Terms and Conditions",
      "Special Offers",
      "Customer Reviews",
    ],
  },
];

export default FOOTER_LINKS;

 const FOOTER_CONTACT_INFO = {
  title: "Contact Us",
  links: [
    { label: "Contact Number", value: "123-456-7890" },
    { label: "Email Address", value: "info@shoppee.com" },
  ],
};

export const SOCIALS = {
  title: "Social",
  links: [

    instagram,
    twitter,
    youtube,
    linkedin
  ],
};

export default SOCIALS;
