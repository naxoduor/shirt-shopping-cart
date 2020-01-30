-- Create tshirtshop tables

-- Create department table
CREATE TABLE `department` (
  `department_id` INT            NOT NULL  AUTO_INCREMENT,
  `name`          VARCHAR(100)   NOT NULL,
  `description`   VARCHAR(1000),
  PRIMARY KEY  (`department_id`)
) ENGINE=MyISAM;

-- Create category table

CREATE TABLE `category` (
  `category_id`   INT            NOT NULL  AUTO_INCREMENT,
  `department_id` INT            NOT NULL,
  `name`          VARCHAR(100)   NOT NULL,
  `description`   VARCHAR(1000),
  PRIMARY KEY (`category_id`),
  KEY `idx_category_department_id` (`department_id`)
) ENGINE=MyISAM;

-- Create product table
CREATE TABLE `product` (
  `product_id`       INT           NOT NULL  AUTO_INCREMENT,
  `name`             VARCHAR(100)  NOT NULL,
  `description`      VARCHAR(1000) NOT NULL,
  `specification`    VARCHAR(1000) NOT NULL,
  `price`            DECIMAL(10,2) NOT NULL,
  `discounted_price` DECIMAL(10,2) NOT NULL  DEFAULT '0.00',
  `delivery_cost`    DECIMAL(10,2) NOT NULL,
  `image`            VARCHAR(150),
  `image_2`          VARCHAR(150),
  `thumbnail`        VARCHAR(150),
  `display`          SMALLINT(6)   NOT NULL  DEFAULT '0',
  PRIMARY KEY  (`product_id`),
  FULLTEXT KEY `idx_ft_product_name_description` (`name`, `description`)
) ENGINE=MyISAM;

-- Create product_category table
CREATE TABLE `product_category` (
  `product_id`  INT NOT NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`product_id`, `category_id`)
) ENGINE=MyISAM;

-- Create attribute table (stores attributes such as Size and Color)
CREATE TABLE `attribute` (
  `attribute_id` INT          NOT NULL  AUTO_INCREMENT,
  `name`         VARCHAR(100) NOT NULL, -- E.g. Color, Size
  PRIMARY KEY (`attribute_id`)
) ENGINE=MyISAM;


-- Create attribute_value table (stores values such as Yellow or XXL)
CREATE TABLE `attribute_value` (
  `attribute_value_id` INT          NOT NULL  AUTO_INCREMENT,
  `attribute_id`       INT          NOT NULL, -- The ID of the attribute
  `value`              VARCHAR(100) NOT NULL, -- E.g. Yellow
  PRIMARY KEY (`attribute_value_id`),
  KEY `idx_attribute_value_attribute_id` (`attribute_id`)
) ENGINE=MyISAM;

-- Create product_attribute table (associates attribute values to products)
CREATE TABLE `product_attribute` (
  `product_id`         INT NOT NULL,
  `attribute_value_id` INT NOT NULL,
  PRIMARY KEY (`product_id`, `attribute_value_id`)
) ENGINE=MyISAM;


-- Create shopping_cart table
CREATE TABLE `shopping_cart` (
  `item_id`     VARCHAR(255)  NOT NULL,
  `cart_id`     CHAR(32)      NOT NULL,
  `product_id`  INT           NOT NULL,
  `attributes`  VARCHAR(1000),
  `quantity`    INT           NOT NULL,
  `buy_now`     BOOL          NOT NULL  DEFAULT true,
  `added_on`    DATETIME      NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `idx_shopping_cart_cart_id` (`cart_id`)
) ENGINE=MyISAM;

-- Create orders table
CREATE TABLE `orders` (
  `order_id`     INT           NOT NULL  AUTO_INCREMENT,
  `total_amount` DECIMAL(10,2) NOT NULL  DEFAULT '0.00',
  `created_on`   DATETIME      NOT NULL,
  `shipped_on`   DATETIME,
  `status`       INT           NOT NULL  DEFAULT '0',
  `comments`     VARCHAR(255),
  `customer_id`  INT,
  `auth_code`    VARCHAR(50),
  `reference`    VARCHAR(50),
  `shipping_region_id`  INT,
  `tax_id`       INT,
  PRIMARY KEY  (`order_id`),
  KEY `idx_orders_customer_id` (`customer_id`),
  KEY `idx_orders_shipping_region_id` (`shipping_region_id`),
  KEY `idx_orders_tax_id` (`tax_id`)
) ENGINE=MyISAM;

-- Create order_details table
CREATE TABLE `order_detail` (
  `item_id`      	INT           NOT NULL  AUTO_INCREMENT,
  `order_id`     	INT           NOT NULL,
  `product_id`   	INT           NOT NULL,
  `attributes`   	VARCHAR(1000) NOT NULL,
  `product_name` 	VARCHAR(100)  NOT NULL,
  `quantity`     	INT           NOT NULL,
  `unit_cost`    	DECIMAL(10,2) NOT NULL,
  `delivery_cost`	DECIMAL(10,2),
  PRIMARY KEY  (`item_id`),
  KEY `idx_order_detail_order_id` (`order_id`)
) ENGINE=MyISAM;

-- Create shipping_region table
CREATE TABLE `shipping_region` (
  `shipping_region_id` INT          NOT NULL  AUTO_INCREMENT,
  `shipping_region`    VARCHAR(100) NOT NULL,
  `region_id`          INT          NOT NULL,
  PRIMARY KEY  (`shipping_region_id`)
) ENGINE=MyISAM;

-- Create customer table
CREATE TABLE `customer` (
  `customer_id`        INT           NOT NULL AUTO_INCREMENT,
  `name`               VARCHAR(50)   NOT NULL,
  `email`              VARCHAR(100)  NOT NULL,
  `password`           VARCHAR(200)   NOT NULL,
  `credit_card`        TEXT,
  `address_1`          VARCHAR(100),
  `address_2`          VARCHAR(100),
  `city`               VARCHAR(100),
  `region`             VARCHAR(100),
  `postal_code`        VARCHAR(100),
  `country`            VARCHAR(100),
  `shipping_region_id` INT           NOT NULL default '1',
  `day_phone`          varchar(100),
  `eve_phone`          varchar(100),
  `mob_phone`          varchar(100),
  PRIMARY KEY  (`customer_id`),
  UNIQUE KEY `idx_customer_email` (`email`),
  KEY `idx_customer_shipping_region_id` (`shipping_region_id`)
) ENGINE=MyISAM;

-- Create shipping table
CREATE TABLE `shipping` (
  `shipping_id`        INT            NOT NULL AUTO_INCREMENT,
  `shipping_type`      VARCHAR(100)   NOT NULL,
  `shipping_cost`      NUMERIC(10, 2) NOT NULL,
  `shipping_region_id` INT            NOT NULL,
  PRIMARY KEY (`shipping_id`),
  KEY `idx_shipping_shipping_region_id` (`shipping_region_id`)
) ENGINE=MyISAM;

-- Create tax table
CREATE TABLE `tax` (
  `tax_id`         INT            NOT NULL  AUTO_INCREMENT,
  `tax_type`       VARCHAR(100)   NOT NULL,
  `tax_percentage` NUMERIC(10, 2) NOT NULL,
  PRIMARY KEY (`tax_id`)
) ENGINE=MyISAM;

-- Create audit table
CREATE TABLE `audit` (
  `audit_id`       INT      NOT NULL AUTO_INCREMENT,
  `order_id`       INT      NOT NULL,
  `created_on`     DATETIME NOT NULL,
  `message`        TEXT     NOT NULL,
  `code`           INT      NOT NULL,
  PRIMARY KEY (`audit_id`),
  KEY `idx_audit_order_id` (`order_id`)
) ENGINE=MyISAM;

-- Create review table
CREATE TABLE `review` (
  `review_id`   INT      NOT NULL  AUTO_INCREMENT,
  `customer_id` INT      NOT NULL,
  `product_id`  INT      NOT NULL,
  `review`      TEXT     NOT NULL,


  `rating`      SMALLINT NOT NULL,
  `created_on`  DATETIME NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `idx_review_customer_id` (`customer_id`),
  KEY `idx_review_product_id` (`product_id`)
) ENGINE=MyISAM;

-- Populate department table
INSERT INTO `department` (`department_id`, `name`, `description`) VALUES
       (1, 'Solar Panels', 'Solar Panels'),
       (2, 'Inverters', 'Inverters'),
       (3 , 'Charge Controller', 'Charge Controller');

-- Populate category table
INSERT INTO `category` (`category_id`, `department_id`, `name`, `description`) VALUES
       (1, 1, 'Solar Panels', 'SolarMax Solar Panels'),
       (2, 2, 'Inverters', 'Inverters'),
       (3, 3, 'Charge Controllers', 'Charge Controllers');

-- Populate product table
INSERT INTO `product` (`product_id`, `name`, `description`, `specification`, `price`, `discounted_price`, `delivery_cost`, `image`, `image_2`, `thumbnail`, `display`) VALUES
	(1, 'solarmax  Solar Africa SolarMax 150W 12V Mono crystalline solar panel,High efficiency cells', 'Product details
Type: mono crystaline
Use: Inverter Charging
Durability: High
Cell Efficiency: High
Installation: Use Expert like us
Solar panels trap the free energy of the sun for your use. It can be integrated into your existing installation of Inverter and Batteries.', 'SPECIFICATIONS
SKU: SO830HL001D8ANAFAMZ
Wattage: 12V, 160W
Main Material: Glass
Weight (kg): 7', 8600, 0.00, 1000, 'solarmax1.jpg', 'solarmax1.jpg', 'solarmax1.jpg', 0),
(2, 'solarmax  Poly 100 Watt Solar Panel', 'Product details
High module conversion efficiency. Ideal output for single panel: 100Wh per day (depending on the availability of sunlight).


Bypass diode minimizes power drop caused by shade and ensures excellent performance in low-light environments
work with all weather even when there is mist and rainly
EL tested solar modules; no hot-spot heating guaranteed.
Advanced encapsulation material with multilayered sheet laminations to enhance cell performance and provide a long service life.
Corrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decades as well as withstand high winds (2400Pa.

Anti-reflective, high transparency, low iron-tempered glass with enhanced stiffness and impact resistance..
TPT back sheet ensures smooth performance over a long period of time
', 'KEY FEATURES
·        Open Circuit Voltage: 15.5V 
·        Short Circuit Current: 6.37A  
·        Max Power Voltage: 17.5V 
·        Max Power Current: 5.71A 
·        Max System Voltage: 700VDC
·        25 year life expectancy
WHAT’S IN THE BOX
1*Panel
SPECIFICATIONS
SKU: SO830HL133TU6NAFAMZ
Main Material: Metal and Glass
Size (L x W x H cm): 90 x 50 x 8
Weight (kg): 15', 6960, 8700.00, 1000, 'solarmax2.jpg', 'solarmax2.jpg', 'solarmax2.jpg', 0),
(3, 'solarmax  Solar 120 Watt Solar Panel ( All Weather) Poly', 'Product details
solarmax solar panel have  high efficiency solar modules are constructed from 36 polycrystalline, (12V modules) or 72 cells (24V modules) cells. 
The cells are individually tested and matched for optimum performance before being built into the protective module structure. A Tedlar® base is used and ethylene vinyl acetate encapsulant.
High transmission tempered glass protects the cells from the front and a high strength polymer sheet at the rear. A reinforced aluminium frame completes the laminate structure which is fully sealed against moisture and protected from environmental and mechanical damage.
Most common mistake people is mixing of batterys. car batterys are not good in solar storage and have internal resistance
for more information, contact the seller  for guideline', 'Specifications
KEY FEATURES
Type: poly- crystaline
Use: Inverter Charging
Durability: High
Cell Efficiency: High
Installation: Use Expert like reowatt electrica enterprises
Solar panels trap the free energy of the sun for your use. It can be integrated into your existing installation of Inverter and Batteries.
WHAT’S IN THE BOX
Solar Panel
SPECIFICATIONS
SKU: SO830HL10LP32NAFAMZ
Wattage: 120w
Care Label: INSTALLED BY QUALIFIED ELECTRICAL TECHNICIAN ( reowatt electrical s)<br />
Main Material: Silicon,glass
Size (L x W x H cm): 1120 x80 x 8
Weight (kg): 7', 10999, 20999.00, 1000, 'solarmax3.jpg', 'solarmax3.jpg', 'solarmax3.jpg', 0),
(4, 'solarmax Solar Panel 150Watts, Charger Controller, 600Watts Inverter,3 LED Bulbs
', 'Product details
solarmax solar panel have  high efficiency solar modules are constructed from 36 polycrystalline, (12V modules) or 72 cells (24V modules) cells. The cells are individually tested and matched for optimum performance before being built into the protective module structure. A Tedlar® base is used and ethylene vinyl acetate encapsulate. High transmission tempered glass protects the cells from the front and a high strength polymer sheet at the rear. A reinforced aluminium frame completes the laminate structure which is fully sealed against moisture and protected from environmental and mechanical damage.Most common mistake people is mixing of battery. car batterys are not good in solar storage and have internal resistance for more information, contact the seller  for guideline
A basic charge controller simply performs the necessary function of ensuring that your batteries cannot be damaged by over-charging, effectively cutting off the current from the PV panels (or reducing it to a pulse) when the battery voltage reaches a certain level.', 'Specifications
KEY FEATURES
Type: poly- crystaline
Use: Inverter Charging
Durability: High
Cell Efficiency: High
Solar panels trap the free energy of the sun for your use. It can be integrated into your existing installation of Inverter and Batteries.
 charger controller
Built-in micro controller.
Large screen LCD display.
Charge and discharge parameters can be adjusted.
With power off memory function.
Dual USB output. Support for iPhone charging.
Fully 4-stage PWN charge
 inverter
Wide input mains voltage: 160 - 260v.
High efficiency, low loss design.
Friendly operation interface and clear information display.
Pure sine wave output suitable for all appliances.
Intelligent cooling fan for quieter working.
Robust design for long trouble free service. 
WHAT’S IN THE BOX
150watt Solar Panel. 600 watt inverter, charger controller, bulbs
SPECIFICATIONS
SKU: SO830LB189ZUENAFAMZ
Main Material: Silicon,glass
Size (L x W x H cm): 1150 x 80 x 8
Weight (kg): 9', 15800, 20800.00, 1000, 'solarmax4.jpg', 'solarmax4.jpg', 'solarmax4.jpg', 0),
(5, 'solarmax 100 watt Solar Panel,charger controller, 300watt inverter, 3 bulbs', 'Product details
solarmax solar panel have  high efficiency solar modules are constructed from 36 polycrystalline, (12V modules) or 72 cells (24V modules) cells. The cells are individually tested and matched for optimum performance before being built into the protective module structure. A Tedlar® base is used and ethylene vinyl acetate encapsulant. High transmission tempered glass protects the cells from the front and a high strength polymer sheet at the rear. A reinforced aluminium frame completes the laminate structure which is fully sealed against moisture and protected from environmental and mechanical damage.Most common mistake people is mixing of batterys. car batterys are not good in solar storage and have internal resistancefor more information, contact the seller  for guideline 
A basic charge controller simply performs the necessary function of ensuring that your batteries cannot be damaged by over-charging, effectively cutting off the current from the PV panels (or reducing it to a pulse) when the battery voltage reaches a certain level.', 'Specifications
KEY FEATURES
Type: poly- crystaline
Use: Inverter Charging
Durability: High
Cell Efficiency: High
Installation: Use Expert like reowatt electrica enterprises
Solar panels trap the free energy of the sun for your use. It can be integrated into your existing installation of Inverter and Batteries.
 charger controller
Built-in micro controller.
Large screen LCD display.
Charge and discharge parameters can be adjusted.
With power off memory function.
Dual USB output. Support for iPhone charging.
Fully 4-stage PWN charge
 inverter
Wide input mains voltage: 160 - 260v.
High efficiency, low loss design.
Friendly operation interface and clear information display.
Pure sine wave output suitable for all appliances.
Intelligent cooling fan for quieter working.
Robust design for long trouble free service. 
WHAT’S IN THE BOX
Solar Panel. 300watt inverter, charger controller, bulbs
SPECIFICATIONS
SKU: SO830HL12VBUMNAFAMZ
Capacity (L): 100
Wattage: 100w 12v - 18v
Care Label: INSTALLED BY QUALIFIED ELECTRICAL TECHNICIAN ( reowatt electricals)<br />
Main Material: Silicon,glass
Size (L x W x H cm): 1120 x80 x 8
Weight (kg): 7', 10500, 15000.00, 1000, 'solarmax5.jpg', 'solarmax5.jpg', 'solarmax5.jpg', 0),
(6, 'solarmax 200Watts Solar Panel with 300Watt Inverter and 20A charge controller', 'Product details
200Watts Solar Panel with 300Watt Inverter and 20A charge controller
High module conversion efficiency. Ideal output for single panel: 200Wh per day (depending on the availability of sunlight).
Bypass diode minimizes power drop caused by shade and ensures excellent performance in low-light environments
work with all weather even when there is mist and rainly
EL tested solar modules; no hot-spot heating guaranteed.
Advanced encapsulation material with multilayered sheet laminations to enhance cell performance and provide a long service life.
Corrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decades as well as withstand high winds (2400Pa.
Anti-reflective, high transparency, low iron-tempered glass with enhanced stiffness and impact resistance..
TPT back sheet ensures smooth performance over a long period of time
High module conversion efficiency. Ideal output for single panel: 200Wh per day (depending on the availability of sunlight).
Bypass diode minimizes power drop caused by shade and ensures excellent performance in low-light environments
work with all weather even when there is mist and rainly
EL tested solar modules; no hot-spot heating guaranteed.
Advanced encapsulation material with multilayered sheet laminations to enhance cell performance and provide a long service life.
Corrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decades as well as withstand high winds (2400Pa.
Anti-reflective, high transparency, low iron-tempered glass with enhanced stiffness and impact resistance..
TPT back sheet ensures smooth performance over a long period of time
High module conversion efficiency. Ideal output for single panel: 200Wh per day (depending on the availability of sunlight).
Bypass diode minimizes power drop caused by shade and ensures excellent performance in low-light environments
work with all weather even when there is mist and rainly
EL tested solar modules; no hot-spot heating guaranteed.
Advanced encapsulation material with multilayered sheet laminations to enhance cell performance and provide a long service life.
Corrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decades as well as withstand high winds (2400Pa.
Anti-reflective, high transparency, low iron-tempered glass with enhanced stiffness and impact resistance..
TPT back sheet ensures smooth performance over a long period of time
High module conversion efficiency. Ideal output for single panel: 200Wh per day (depending on the availability of sunlight).
Bypass diode minimizes power drop caused by shade and ensures excellent performance in low-light environments
work with all weather even when there is mist and rainly
EL tested solar modules; no hot-spot heating guaranteed.
Advanced encapsulation material with multilayered sheet laminations to enhance cell performance and provide a long service life.
Corrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decades as well as withstand high winds (2400Pa.
Anti-reflective, high transparency, low iron-tempered glass with enhanced stiffness and impact resistance..
TPT back sheet ensures smooth performance over a long period of time
High module conversion efficiency. Ideal output for single panel: 200Wh per day (depending on the availability of sunlight).
Bypass diode minimizes power drop caused by shade and ensures excellent performance in low-light environments
work with all weather even when there is mist and rainly
EL tested solar modules; no hot-spot heating guaranteed.
Advanced encapsulation material with multilayered sheet laminations to enhance cell performance and provide a long service life.
Corrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decades as well as withstand high winds (2400Pa.
Anti-reflective, high transparency, low iron-tempered glass with enhanced stiffness and impact resistance..
TPT back sheet ensures smooth performance over a long period of time
', 'Specifications
KEY FEATURES
200Watts Solar Panel with 300Watt Inverter and 20A charge controller
High module conversion efficiency. Ideal output for single panel: 200Wh per day (depending on the availability of sunlight).
Bypass diode minimizes power drop caused by shade and ensures excellent performance in low-light environments
work with all weather even when there is mist and rainly
EL tested solar modules; no hot-spot heating guaranteed.
Advanced encapsulation material with multilayered sheet laminations to enhance cell performance and provide a long service life.
Corrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decades as well as withstand high winds (2400Pa.
Anti-reflective, high transparency, low iron-tempered glass with enhanced stiffness and impact resistance..
TPT back sheet ensures smooth performance over a long period of time
WHAT’S IN THE BOX
One 200 Watts Solar PanelOne 300Watts inverterOne 20A charge controller
SPECIFICATIONS
SKU: SO830LB1JACLENAFAMZ
Care Label: FRAGILE
Main Material: Silicon,Glass
Production Country: China
Size (L x W x H cm): 1120 x80 x 8
Weight (kg): 7
', 18500, 22000.00, 1000, 'solarmax6.jpg', 'solarmax6.jpg', 'solarmax6.jpg', 0),
(7, 'solarmax Monocrystalline solar Panel - 80W - 18volts -', 'Product details
High module conversion efficiency. Ideal output for single panel: 80Wh per day (depending on the availability of sunlight).
Bypass diode minimizes power drop caused by shade and ensures excellent performance in low-light environments
work with all weather even when there is mist and rainy
EL tested solar modules; no hot-spot heating guaranteed.
Advanced encapsulation material with multilayered sheet lamination to enhance cell performance and provide a long service life.
Corrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decades as well as withstand high winds 2400Pa.
Anti-reflective, high transparency, low iron-tempered glass with enhanced stiffness and impact resistance..
TPT back sheet ensures smooth performance over a long period of time
order online on Jumia and have it delivered at your doorstep
S', 'KEY FEATURES
80 watts 
15v volts 
changing current 3.3 Amps  - 5.5 amps
work best with  12volts 45ah -80ah battery deep cycle battery or turbulence 
WHAT’S IN THE BOX
1xsolar panel
SPECIFICATIONS
SKU: SO717HL16FBAYNAFAMZ
Wattage: 80w
Care Label: solar max
Main Material: metal and glass
Size (L x W x H cm): 15 x 8.0 x4
Weight (kg): 10', 5990, 10999.00, 1000, 'solarmax7.jpg', 'solarmax7.jpg', 'solarmax7.jpg', 0),
(8, 'solarmax 18Volt 50Watt Solar Panel Kit Polycrystalline + 20 Amp Solar Charger Controller with LCD', 'Product details
50W monocrystalline is a robust solar module with 44 solar cells. These modules can be used for off-grid solar applications.charge gradually

【Potential Uses】The 50 Watt Monocrystalline Panel can be used in various off-grid applications that include 12 and 24 volts arrays, water pumping systems, signaling systems and other off-grid application
【Reliable】Advanced encapsulation material with multi-layered sheet laminations to enhance cell performance and provide a long service life. 100% EL testing on all modules; no hot-spot heating guaranteed. Bypass diodes minimize power drop caused by shade and ensure excellent performance in low-light environments. TPT back sheet ensures smooth performance over a long period of time
【Durable】Guaranteed positive output tolerance (0-3%); withstands high winds (2400Pa) and snow loads (5400Pa). Corrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decades. Anti-reflective, high transparency, low iron-tempered glass with enhanced stiffness and impact resistance. IP65 rated junction box provides complete protection against environmental particles and low pressure water jets
【Versatile】Can be used for many different applications. Ground mount compatible. Compatible with on-grid and off-grid inverters
【Installation Ready】Pre-drilled holes on the back of the panel allow for fast mounting and securing. Pre-drilled holes included for grounding. Compatible with different mounting systems such as Z-Brackets, Pole Mounts and Tilt Mounts', 'Specifications
KEY FEATURES
Max Power at STC (Pmax) = 50 watt
Open Circuit Voltage (Voc) = 22.7 V
Short Circuit Current (Isc) = 2.84 A
Optimum Operating Voltage (Vmp) = 18.5 V
Optimum Operating Current (Imp) = 2.70 A
Max System Voltage = 600VDC (UL)
Max Series Fuse Rating = 15 Amp
WHAT’S IN THE BOX
1. 50 Watt mono crystalline solar panel
SPECIFICATIONS
SKU: SO830HL192FOQNAFAMZ
Capacity (L): 1
Wattage: 50watts
Care Label: Fragile
Main Material: Alluminium and silicon
Size (L x W x H cm): 63*54*30
Weight (kg): 3.8', 6999, 10999.00, 1000, 'solarmax8.jpg', 'solarmax8.jpg', 'solarmax8.jpg', 0),
(9, 'solarmax 200W Mono Crystalline Solar Panel,High Efficiency Cells
', 'Product details
Mono-crystalline High efficiency Solar panel and 12 Volts output. The panel comes with a warranty of 25 years and are entirely made from high quality materials. This panel is ideal for home inverters, battery charging, street lighting and other applications

KEY FEATURES

Type: mono crystaline
Use: Inverter Charging
Durability: High
Cell Efficiency: High
Installation: Use Expert like us
Solar panels trap the free energy of the sun for your use. It can be integrated into your existing installation of Inverter and Batteries.', 'Specifications
KEY FEATURES
Type: mono crystaline
Use: Inverter Charging
Durability: High
Cell Efficiency: High
Installation: Use Expert like us
Solar panels trap the free energy of the sun for your use. It can be integrated into your existing installation of Inverter and Batteries.
WHAT’S IN THE BOX
Solar Panel
SPECIFICATIONS
SKU: SO830HL0SJ0OQNAFAMZ
Capacity (L): 1
Wattage: 200watts
Main Material: Metal and glass
Size (L x W x H cm): 11.5 x 7 x 2.5
Weight (kg): 15', 20999, 25999.00, 1000, 'solarmax9.jpg', 'solarmax9.jpg', 'solarmax9.jpg', 0),
(10, 'solarmax 200Watts 18Volts Solar Panel', 'Product details
Under optimum conditions this panel will produce up to 10-11A of electrical current. This is at a cell temperature of 25°C, measured with a thermocouple from the back of the panel.  Its possible to generate more than 12 amps if at 0°Celsius, i.e. in snow and bright sunlight.

High solar cell efficiency Monocrystalline 18.4%Bypass diodes minimize power drop caused by shade and ensure excellent performance in low-light environmentEL tested solar modules; no hot-spot heating guaranteedCorrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decadesTPT back sheet ensures smooth performance over a long period of timeIP65 rated junction box provides complete protection against environmental particles and low pressure water jets
', 'Specifications
KEY FEATURES
High solar cell efficiency Monocrystalline 18.4%
Bypass diodes minimize power drop caused by shade and ensure excellent performance in low-light environment
EL tested solar modules; no hot-spot heating guaranteed
Corrosion-resistant aluminum frame for extended outdoor use, allowing the panels to last for decades
TPT back sheet ensures smooth performance over a long period of time
IP65 rated junction box provides complete protection against environmental particles and low pressure water jets
WHAT’S IN THE BOX
1 x solar panel
SPECIFICATIONS
SKU: SO830HL1AFCN6NAFAMZ
Care Label: fragile
Main Material: Steel and crystalline plastic
Size (L x W x H cm): 158*80.8*0.35
Weight (kg): 14.2', 19199, 29199.00, 1000, 'solarmax10.jpg', 'solarmax10.jpg', 'solarmax10.jpg', 0),
(11, '24v 275w suntech solar panel', '24V 275W Solar Panel with 25 Year out Warranty
60 cell formation
Excellent Low Light Performance
High Efficiency with High Transparency Low Iron Tempered Glass
Rugged Extruded and Anodized Aluminum Frame, Fully Sealed
41" Cable with MC4 Connector', 'NEW', 15273, 15273.00, 1000, 'suntech11.jpg', 'suntech11.jpg', 'suntech11.jpg', 0),
(12, 'Suntech Solar Module, 270W, PolyCrystalline, 60-cell, 25yrs Warranty, EIC, TUV, CE STP-270-20/Wfw', 'DESCRIPTION:
This module is perfect for both residential and industrial roofs and has been tested in many climates. The 25 year warranty is also included with this module. Remember that the 250w – 290w range are almost always 60 cell modules, which are not suitable for battery charging except with a MPPT controller. In battery language, they are nominal 18v modules. If you use a PWM charge controller with these modules, you will harvest approximately half of the rated power.', 'Electrical Characteristics
Maximum Power at STC (Pmax) 275 W 270 W 265 W
Optimum Operating Voltage (Vmp) 31.2 V 31.1 V 31.0 V
Optimum Operating Current (Imp) 8.82 A 8.69 A 8.56 A
Open Circuit Voltage (Voc) 38.1 V 37.9 V 37.8 V
Short Circuit Current (Isc) 9.27 A 9.15 A 9.02 A
Module Efficiency 16.8% 16.5% 16.2%
Operating Module Temperature -40 °C to +85 °C
Maximum System Voltage 1000 V DC (IEC)
Maximum Series Fuse Rating 20 A
Power Tolerance 0/+5 W
Maximum Power at NOCT (Pmax) 200.6 W 198 W 194 W
Optimum Operating Voltage (Vmp) 28.5 V 28.4 V 28.3V
Optimum Operating Current (Imp) 7.05 A 6.97 A 6.86 A
Open Circuit Voltage (Voc) 34.8 V 34.9 V 34.8 V
Short Circuit Current (Isc) 7.5 A 7.42 A 7.32 A

Temperature Characteristics
Nominal Operating Cell Temperature (NOCT) 45±2°C
Temperature Coefficient of Pmax -0.41 %/°C
Temperature Coefficient of Voc -0.33 %/°C
Temperature Coefficient of Isc 0.067 %/°C

Mechanical Characteristics
Solar Cell Polycrystalline silicon 6 inches
No. of Cells 60 (6 × 10)
Dimensions 1650 × 992 × 35mm (64.96 × 39.1 × 1.4 inches)
Weight 18.3 kgs (40.3 lbs.)
Front Glass 3.2 mm (0.13 inches) tempered glass
Frame Anodized aluminium alloy
Junction Box IP68 rated (3 bypass diodes)
Output Cables 4.0 mm2
(0.006 inches2
), symmetrical lengths (-) 1000mm (39.4
inches) and (+) 1000 mm (39.4 inches)
Connectors MC4 compatible

Packing Configuration (Container 20’ GP 40’ HC)
Pieces per pallet 30 30
Pallets per container 6 28
Pieces per container 180 840

', 14441, 14441.00, 1000, 'suntech12.jpg', 'suntech12.jpg', 'suntech12.jpg', 0),
(13, 'Generic Lingoi power inverter', 'Product details
If you are looking for a realible DC-AC power inverter, then the 300W Lingqi DC to AC Power Inverter is the best deal for you. Ideally, it is compatible for all kinds of electric equipments with power consumption of less than 500W with voltages equal to AC 220V, such as cell-phone, portable computer, electric light, digital camera, TV, CD player, DVD, electric fan, electric tool and so on. The output is a universal socket, which can be used in many electrical installations. Order for this DC-AC power inverter online on Jumia Kenya and have it delivered to you at an amazing price.', 'Specifications
KEY FEATURES
Under Voltage protection
Over voltage protection
Short circuit protection
Overload protection
Alloy Aluminum cases
Its a 300-600w peak power

WHAT’S IN THE BOX
Power inverter Ac-Dc inverter
SPECIFICATIONS
SKU: GE840HL0YWUVINAFAMZ
Main Material: Metallic
Weight (kg): 1.5', 3800, 3800.00, 1000, 'inverter13.jpg', 'inverter13.jpg', 'inverter13.jpg', 0),
(14, 'solarmax POWER INVERTER 300w', 'Product details
SolarMax has designed a compact and stylish modified sine wave inverter that operates silently
This inverter is ideal for electrical equipment with a consumption lower than 300W with a voltage of 220V such as cell phones, TVs, DVDs, laptops, electric lights, digital cameras, electric fans, electric tools and so on.
This inverter packs a PWM CMOS allowing for a smaller and quiet system
The inverter comes with spare fuses. just in case the digital protection measures do not kick in on time.
with a one year warranty, you can be assured of a quality product.', 'Specifications
KEY FEATURES
Features
300W Continuous Power
600W Peak (Maximum) Power
High Converting Efficiency
Under Voltage Protection
Over Voltage Protection
Short Circuit Protection
Overload Protection
Aluminium Alloy Housing
WHAT’S IN THE BOX
1 300W SolarMax power inverter2 battery connector cables ie positive(red) and negative (black)1 spare fuse

SPECIFICATIONS
SKU: SO830HL0Z4P6VNAFAMZ
Capacity (L): 300
Care Label: FRAGILE&nbsp;
Main Material: metal
Size (L x W x H cm): 16.8x9.2x3.4
Weight (kg): 0.32
', 2400, 2400.00, 1000, 'inverter14.jpg', 'inverter14.jpg', 'inverter14.jpg', 0),
(15, 'solarmax 600W POWER INVERTER (MOSFET)', 'Product details
SolarMax has designed a compact and stylish modified sine wave inverter that operates silently
This inverter is ideal for electrical equipment with a consumption lower than 600W with a voltage of 220V such as cell phones, TVs, DVDs, laptops, electric lights, digital cameras, electric fans, electric tools and so on.
This inverter packs a PWM CMOS allowing for a smaller and quiet system
The inverter comes with spare fuses. just in case the digital protection measures do not kick in on time.
with a one year warranty, you can be assured of a quality product.
', 'Specifications
KEY FEATURES
Features
600W Continuous Power
1200W Peak (Maximum) Power
High Converting Efficiency
Under Voltage Protection
Over Voltage Protection
Short Circuit Protection
Overload Protection
Aluminium Alloy Housing
WHAT’S IN THE BOX
1 600W SolarMax power inverter2 battery connector cables ie positive(red) and negative (black)1 spare fuse

SPECIFICATIONS
SKU: SO830HL07MU0SNAFAMZ
Capacity (L): 300
Care Label: FRAGILE&nbsp;
Main Material: metal
Size (L x W x H cm): 16.8x9.2x3.4
Weight (kg): 0.32', 3700, 3700.00, 500, 'inverter15.jpg', 'inverter15.jpg', 'inverter15.jpg', 0),
(16, 'Generic 1000W Grid Tie Inverter 230V MPPT Pure Sine Wave Inverter 50Hz/60Hz', 'Generic 1000W Grid Tie Inverter 230V MPPT Pure Sine Wave Inverter 50Hz/60Hz','Generic 1000W Grid Tie Inverter 230V MPPT Pure Sine Wave Inverter 50Hz/60Hz', 3700, 3700.00, 500, 'inverter16.jpg', 'inverter16.jpg', 'inverter16.jpg', 0),
(17, 'solarmax 20A PWM Solar Panel Battery Charge Controller', 'Product details
This is an intelligent solar charge anddischarge controller. Fixed LCD display with a very friendly interface, variouscontrol parameters can be flexibly set, fully meet your home Photovoltaicsystem (including home lighting system) requirements. Widely used for solargreen light, solar light billboards, solar insecticidal lights, solar powergeneration systems, ship solar power systems, solar power generation systems,and more.

 

Features:

Stable Performance: Built-in industrialmicro controller, which can operate steadily in cold, high temperature andhumid environment.
12V/ 24V Voltage Auto Identification, so intelligentand provides your life more convenience.
LCD Display Large Screen: ensuresconvenient and intuitive operations.
Dual USB output: Easy connect to mobilephones, allows fast and powerful charging for mobilephones.
Fully 3-stage PWM charge management: Equalizingcharge to the battery periodically, can effectively prevent the battery from non-equalizationand sulfuration, and prolong the batterys service life
Full Protection: Provides overcharge,over-discharge, overload protection, as well as short-circuit andreverse-connection protection.
Wide range of load working: facilitate theproducts application to different types of street lights and monitoringdevices.
Wide Application: Applicable for solargreen light, solar light billboards, solar insecticidal lights, solar powergeneration systems, ship solar power systems, solar power generation systems,etc.


Specifications:

Color: Green + Black

Rated Voltage: 12/ 24V (Auto-ID)

Max. Generating Current: 20A

Dissipation:≤13MA

Charging Mode: PWM

Waterproof: IP32

Working TEMP: -20℃~ 55℃

Size: Approx. 188 x 94 x 48mm / 7.4 x 3.7 x1.9in

Package Weight: 850g

 

Package Included:

1 x Solar Charge Controller

1 x User Manual

','Specifications
KEY FEATURES
Stable Performance: Built-in industrial micro controller, which can operate steadily in cold, high temperature and humid environment.
12V/ 24V Voltage Auto Identification, so intelligent and provides your life more convenience.
LCD Display Large Screen: ensures convenient and intuitive operations.
Dual USB output: Easy connect to mobile phones, allows fast and powerful charging for mobile phones.
Fully 3-stage PWM charge management: Equalizing charge to the battery periodically, can effectively prevent the battery from non-equalization and sulfuration, and prolong the batterys service life
WHAT’S IN THE BOX
1 x Solar Charge Controller
SPECIFICATIONS
SKU: SO830EL0OA7VUNAFAMZ
Main Material: Pvc
Size (L x W x H cm): 1
Weight (kg): 0.393', 3500, 3500.00, 500, 'ccontroller17.jpg', 'ccontroller17.jpg', 'ccontroller17.jpg', 0),
(18, 'solarmax 30A LCD Solar PV Charge Regulators PWM Solar Charger Controller Dual USB', 'Product details
Description:

This is an intelligent solar charge anddischarge controller. Fixed LCD display with a very friendly interface, variouscontrol parameters can be flexibly set, fully meet your home Photovoltaicsystem (including home lighting system) requirements. Widely used for solargreen light, solar light billboards, solar insecticidal lights, solar powergeneration systems, ship solar power systems, solar power generation systems,and more.

 

Features:

Stable Performance: Built-in industrialmicro controller, which can operate steadily in cold, high temperature andhumid environment.
12V/ 24V Voltage Auto Identification, so intelligentand provides your life more convenience.
LCD Display Large Screen: ensuresconvenient and intuitive operations.
Dual USB output: Easy connect to mobile phones, allows fast and powerful charging for mobile phones.
Fully 3-stage PWM charge management: Equalizing charge to the battery periodically, can effectively prevent the battery from non-equalization and sulfuration, and prolong the batterys service life
Full Protection: Provides overcharge,over-discharge, overload protection, as well as short-circuit andreverse-connection protection.
Wide range of load working: facilitate theproducts application to different types of street lights and monitoringdevices.
Wide Application: Applicable for solargreen light, solar light billboards, solar insecticidal lights, solar powergeneration systems, ship solar power systems, solar power generation systems,etc.', 'Specifications
KEY FEATURES
Stable Performance: Built-in industrial micro controller, which can operate steadily in cold, high temperature and humid environment.
12V/ 24V Voltage Auto Identification, so intelligent and provides your life more convenience.
LCD Display Large Screen: ensures convenient and intuitive operations.
Dual USB output: Easy connect to mobile phones, allows fast and powerful charging for mobile phones.
Fully 3-stage PWM charge management: Equalizing charge to the battery periodically, can effectively prevent the battery from non-equalization and sulfuration, and prolong the batterys service life
WHAT’S IN THE BOX
1 x Solar Charge Controller
SPECIFICATIONS
SKU: SO830EL190OHQNAFAMZ
Main Material: Pvc
Weight (kg): 0.685', 5500, 5500.00, 500, 'ccontroller18.jpg', 'ccontroller18.jpg', 'ccontroller18.jpg', 0),
(19, 'solarmax 20A PWM Solar Panel Battery Charge Controller 12V 24V Auto LCD Display Solar Regulator with Dual USB 5V Output', 'Product details
This is an intelligent solar charge anddischarge controller. Fixed LCD display with a very friendly interface, variouscontrol parameters can be flexibly set, fully meet your home Photovoltaicsystem (including home lighting system) requirements. Widely used for solargreen light, solar light billboards, solar insecticidal lights, solar powergeneration systems, ship solar power systems, solar power generation systems,and more.

 

Features:

Stable Performance: Built-in industrialmicro controller, which can operate steadily in cold, high temperature andhumid environment.
12V/ 24V Voltage Auto Identification, so intelligentand provides your life more convenience.
LCD Display Large Screen: ensuresconvenient and intuitive operations.
Dual USB output: Easy connect to mobilephones, allows fast and powerful charging for mobilephones.
Fully 3-stage PWM charge management: Equalizingcharge to the battery periodically, can effectively prevent the battery from non-equalizationand sulfuration, and prolong the batterys service life
Full Protection: Provides overcharge,over-discharge, overload protection, as well as short-circuit andreverse-connection protection.
Wide range of load working: facilitate theproducts application to different types of street lights and monitoringdevices.
Wide Application: Applicable for solargreen light, solar light billboards, solar insecticidal lights, solar powergeneration systems, ship solar power systems, solar power generation systems,etc.', 'Specifications:

Color: Green + Black

Rated Voltage: 12/ 24V (Auto-ID)

Max. Generating Current: 20A

Dissipation:≤13MA

Charging Mode: PWM

Waterproof: IP32

Working TEMP: -20℃~ 55℃

Size: Approx. 188 x 94 x 48mm / 7.4 x 3.7 x1.9in

Package Weight: 850g

 

Package Included:

1 x Solar Charge Controller

1 x User Manual

Specifications
KEY FEATURES
Stable Performance: Built-in industrial micro controller, which can operate steadily in cold, high temperature and humid environment.
12V/ 24V Voltage Auto Identification, so intelligent and provides your life more convenience.
LCD Display Large Screen: ensures convenient and intuitive operations.
Dual USB output: Easy connect to mobile phones, allows fast and powerful charging for mobile phones.
Fully 3-stage PWM charge management: Equalizing charge to the battery periodically, can effectively prevent the battery from non-equalization and sulfuration, and prolong the batterys service life
WHAT’S IN THE BOX
1 x Solar Charge Controller
SPECIFICATIONS
SKU: SO830EL132CFYNAFAMZ
Main Material: Pvc
Size (L x W x H cm): 1
Weight (kg): 0.393
', 3300, 3300.00, 500, 'ccontroller19.jpg', 'ccontroller19.jpg', 'ccontroller19.jpg', 0),
(20, 'Solarmax TK Series 60A Charge Controller 12V/24V Auto', 'Solarmax TK Series 60A Charge Controller 12V/24V Auto is a newly designed controller.It offers convenient display of LED and LCD,optimized structure design,advanced digital technique and extremely attractive price.The multiple load work modes enable it can be widely used on solar home system,traffic signal,solar street light,solar garden lamp,etc.', 'Charge Control Features& Function

TK Series
Current 60A
12V/24Volt Auto
Humanization LCD display
PWM 3 stage charging
Optional load working mode
Overall effective protection function', 10500, 10500.00, 500, 'ccontroleller20.jpeg', 'ccontroleller20.jpeg', 'ccontroleller20.jpeg', 0),
(21, 'Solarmax TK Series 50A Charge Controller 12V/24V Auto', 'DESCRIPTION
Solarmax TK Series 50A Charge Controller 12V/24V Auto is a newly designed controller.It offers convenient display of LED and LCD,optimized structure design,advanced digital technique and extremely attractive price.The multiple load work modes enable it can be widely used on solar home system,traffic signal,solar street light,solar garden lamp,etc.', 'Charge Control Features& Function

TK Series
Current 50A
12V/24Volt Auto
Humanization LCD display
PWM 3 stage charging
Optional load working mode
Overall effective protection function', 8300, 8300.00, 500, 'ccontroleller21.jpeg', 'ccontroleller21.jpeg', 'ccontroleller21.jpeg', 0),
(22, 'Solarmax TK Series 40A Charge Controller 12V/24V Auto', 'DESCRIPTION
Solarmax TK Series 40A Charge Controller 12V/24V Auto is a newly designed controller.It offers convenient display of LED and LCD,optimized structure design,advanced digital technique and extremely attractive price.The multiple load work modes enable it can be widely used on solar home system,traffic signal,solar street light,solar garden lamp,etc.', 'Charge Control Features& Function

TK Series
Current 40A
12V/24Volt Auto
Humanization LCD display
PWM 3 stage charging
Optional load working mode
Overall effective protection function
', 5700, 5700.00, 500, 'ccontroleller22.jpeg', 'ccontroleller22.jpeg', 'ccontroleller22.jpeg', 0),
(23, 'Solarmax TK Series 30A Charge Controller 12V/24V Auto', 'DESCRIPTION
Solarmax TK Series 30A Charge Controller 12V/24V Auto is a newly designed controller.It offers convenient display of LED and LCD,optimized structure design,advanced digital technique and extremely attractive price.The multiple load work modes enable it can be widely used on solar home system,traffic signal,solar street light,solar garden lamp,etc.', 'Charge Control Features& Function

TK Series
Current 30A
12V/24Volt Auto
Humanization LCD display
PWM 3 stage charging
Optional load working mode
Overall effective protection function
', 3000, 3000.00, 500, 'ccontroleller23.jpeg', 'ccontroleller23.jpeg', 'ccontroleller23.jpeg', 0),
(24, 'Solarmax TK Series 20A Charge Controller 12V/24V Auto', 'DESCRIPTION
Solarmax TK Series 20A Charge Controller 12V/24V Auto is a newly designed controller.It offers convenient display of LED and LCD,optimized structure design,advanced digital technique and extremely attractive price.The multiple load work modes enable it can be widely used on solar home system,traffic signal,solar street light,solar garden lamp,etc.', 'Charge Control Features& Function

TK Series
Current 15A
12V/24Volt Auto
Humanization LCD display
PWM 3 stage charging
Optional load working mode
Overall effective protection function', 2100, 2100.00, 500, 'ccontroleller24.jpeg', 'ccontroleller24.jpeg', 'ccontroleller24.jpeg', 0),
(25, 'Solarmax TK Series 15A Charge Controller 12V/24V Auto', 'DESCRIPTION
Solarmax TK Series 15A Charge Controller 12V/24V Auto is a newly designed controller.It offers convenient display of LED and LCD,optimized structure design,advanced digital technique and extremely attractive price.The multiple load work modes enable it can be widely used on solar home system,traffic signal,solar street light,solar garden lamp,etc.', 'Charge Control Features& Function

TK Series
Current 15A
12V/24Volt Auto
Humanization LCD display
PWM 3 stage charging
Optional load working mode
Overall effective protection function
', 2000, 2000.00, 500, 'ccontroleller25.jpeg', 'ccontroleller25.jpeg', 'ccontroleller25.jpeg', 0),
(26, 'Solarmax TK Series 10A Charge Controller 12V/24V Auto', 'DESCRIPTION
Solarmax TK Series 10A Charge Controller 12V/24V Auto is a newly designed controller.It offers convenient display of LED and LCD,optimized structure design,advanced digital technique and extremely attractive price.The multiple load work modes enable it can be widely used on solar home system,traffic signal,solar street light,solar garden lamp,etc.', 'Charge Control Features& Function

TK Series
Current 10A
12V/24Volt Auto
Humanization LCD display
PWM 3 stage charging
Optional load working mode
Overall effective protection function
', 1700, 1700.00, 500, 'ccontroleller26.jpeg', 'ccontroleller26.jpeg', 'ccontroleller26.jpeg', 0),
(27, 'Solarmax HF 15A Charge Controller 12V/24V Auto', 'DESCRIPTION
Solarmax HF 15A Charge Controller 12V/24V Auto is a newly designed controller.It offers convenient display of LED and LCD,optimized structure design,advanced digital technique and extremely attractive price.The multiple load work modes enable it can be widely used on solar home system,traffic signal,solar street light,solar garden lamp,etc.', 'Charge Control Features& Function

Current 15A
12/24V Auto
Humanization LCD display
PWM 3 stage charging
Optional load working mode
Overall effective protection function', 1700, 1700.00, 500, 'ccontroleller27.jpeg', 'ccontroleller27.jpeg', 'ccontroleller27.jpeg', 0),
(28, 'Solarmax HF 20A Charge Controller 12V/24V Auto', 'DESCRIPTION
Solarmax HF 20A Charge Controller 12V/24V Auto is a newly designed controller.It offers convenient display of LED and LCD,optimized structure design,advanced digital technique and extremely attractive price.The multiple load work modes enable it can be widely used on solar home system,traffic signal,solar street light,solar garden lamp,etc.', 'Charge Control Features& Function

Current 15A
12/24V Auto
Humanization LCD display
PWM 3 stage charging
Optional load working mode
Overall effective protection function
', 1800, 1800.00, 500, 'ccontroleller28.jpeg', 'ccontroleller28.jpeg', 'ccontroleller28.jpeg', 0),
(29, 'Solarmax HF 10A Charge Controller 12V/24V Auto', 'DESCRIPTION
Solarmax HF 10A Charge Controller 12V/24V Auto is a newly designed controller.It offers convenient display of LED and LCD,optimized structure design,advanced digital technique and extremely attractive price.The multiple load work modes enable it can be widely used on solar home system,traffic signal,solar street light,solar garden lamp,etc.', 'Charge Control Features& Function

Humanization LCD display
PWM 3 stage charging
Optional load working mode
Overall effective protection function', 1300, 1300.00, 500, 'ccontroleller29.jpeg', 'ccontroleller29.jpeg', 'ccontroleller29.jpeg', 0);


-- Populate product_category table
INSERT INTO `product_category` (`product_id`, `category_id`) VALUES
       (1, 1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),
       (10,1),(11,1),(12,1),(13,2),(14,4),(15,4),(16,2),(17,3),
       (18,3),(19,3),(20,3),(21,3),(22,3),(23,3),(24,3),(25,3),
       (26,3),(27,3),(28,3),(29,3);

-- Populate attribute table
INSERT INTO `attribute` (`attribute_id`, `name`) VALUES
       (1, 'Size'), (2, 'Color');

-- Populate attribute_value table
INSERT INTO `attribute_value` (`attribute_value_id`, `attribute_id`, `value`) VALUES
       (1, 1, 'S'), (2, 1, 'M'), (3, 1, 'L'), (4, 1, 'XL'), (5, 1, 'XXL'),
       (6, 2, 'White'),  (7, 2, 'Black'), (8, 2, 'Red'), (9, 2, 'Orange'),
       (10, 2, 'Yellow'), (11, 2, 'Green'), (12, 2, 'Blue'),
       (13, 2, 'Indigo'), (14, 2, 'Purple');

-- Populate product_attribute table
INSERT INTO `product_attribute` (`product_id`, `attribute_value_id`)
       SELECT `p`.`product_id`, `av`.`attribute_value_id`
       FROM   `product` `p`, `attribute_value` `av`;


-- Populate shipping_region table
INSERT INTO `shipping_region` (`shipping_region_id`, `shipping_region`, `region_id`) VALUES
       (1, 'Please Select','2'),
       (2,'Agenga','2'),
       (3,'Ahero','2'),
       (4,'Ainabkoi','2'),
       (5,'Akala','2'),
       (6,'Aluor','2'),
       (7,'Amagoro','2'),
       (8,'Amukura','2'),
       (9,'Andigo','2'),
       (10,'Angurai','2'),
       (11,'Anyiko','2'),
       (12,'Archer`s Post','2'),
       (13,'Arror','2'),
       (14,'Asembo Bay','2'),
       (15,'Asumbi','2'),
       (16,'Athi River','2'),
       (17,'AwachTende','2'),
       (18,'Bahati','2'),
       (19,'Bamburi','2'),
       (20,'Banja','2'),
       (21,'Bar Ober','2'),
       (22,'Baragoi','2'),
       (23,'Baraton','2'),
       (24,'Baricho','2'),
       (25,'Bartolimo','2'),
       (26,'Barwesa','2'),
       (27,'Bissil','2'),
       (28,'Bokoli','2'),
       (29,'Bomet','2'),
       (30,'Bondeni','2'),
       (31,'Bondo','2'),
       (32,'Booker','2'),
       (33,'Boro','2'),
       (34,'Budalangi','2'),
       (35,'Bugar','2'),
       (36,'Buhuyi','2'),
       (37,'Bukembe','2'),
       (38,'Bukiri','2'),
       (39,'Bukura','2'),
       (40,'Bulimbo','2'),
       (41,'Bumala','2'),
       (42,'Bumutiru','2'),
       (43,'Bungoma','2'),
       (44,'Bunyore','2'),
       (45,'BuraTana','2'),
       (46,'Burnt Forest','2'),
       (47,'Buru Buru','2'),
       (48,'Busia','2'),
       (49,'Butere','2'),
       (50,'Butula','2'),
       (51,'Buyofu','2'),
       (52,'Chamakanga','2'),
       (53,'Changamwe','2'),
       (54,'Chavakali','2'),
       (55,'Chebiemit','2'),
       (56,'Cheborge','2'),
       (57,'Chebororwa','2'),
       (58,'Chebunyo','2'),
       (59,'Chemamul','2'),
       (60,'Chemaner','2'),
       (61,'Chemase','2'),
       (62,'Chemelil','2'),
       (63,'Chemiron','2'),
       (64,'Chepareria','2'),
       (65,'Chepkorio','2'),
       (66,'Chepsonoi','2'),
       (67,'Cheptais','2'),
       (68,'Cheptalal','2'),
       (69,'Chepterwai','2'),
       (70,'Cheptongei','2'),
       (71,'Chepsinendet','2'),
       (72,'Chesoi','2'),
       (73,'Chiakanyinga','2'),
       (74,'Chaikariga','2'),
       (75,'Chogoria','2'),
       (76,'Chuka','2'),
       (77,'Chuvuli','2'),
       (78,'Chumvi','2'),
       (79,'Chumvini','2'),
       (80,'Chwele','2'),
       (81,'City Square','1'),
       (82,'Coast Gen Hsp','2'),
       (83,'Dadaab','2'),
       (84,'Dago','2'),
       (85,'Dandora','2'),
       (86,'DarajaMbili','2'),
       (87,'Daystar University','2'),
       (88,'Dede','2'),
       (89,'Diani Beach','2'),
       (90,'Docks','2'),
       (91,'DolDol','2'),
       (92,'Dorofu','2'),
       (93,'Dudi','2'),
       (94,'Dundori','2'),
       (95,'Eastleigh','1'),
       (96,'Egerton University','2'),
       (97,'Ekalakala','2'),
       (98,'El Wak','2'),
       (99,'Elburgon','2'),
       (100,'Eldama Ravine','2'),
       (101,'Eldoret Airport','2'),
       (102,'Eldoret GPO','2'),
       (103,'Elementatita','2'),
       (104,'Elugulu','2'),
       (105,'Emali','2'),
       (106,'Embakasi','1'),
       (107,'Embu','2'),
       (108,'Emining','2'),
       (109,'Emuhaya','2'),
       (110,'Endarasha','2'),
       (111,'Endau','2'),
       (112,'Endebess','2'),
       (113,'Enosaen','2'),
       (114,'Enterprise Road','1'),
       (115,'Eregi postal','2'),
       (116,'Etago postal','2'),
       (117,'EwasoKedong','2'),
       (118,'Faza','2'),
       (119,'Fort Ternan','2'),
       (120,'Funyula','2'),
       (121,'Gacharage-ini','2'),
       (122,'Gachoka','2'),
       (123,'Gaitu','2'),
       (124,'Gakere Road','2'),
       (125,'Gakindu','2'),
       (126,'Gambogi','2'),
       (127,'Ganze','2'),
       (128,'GarbaTulla','2'),
       (129,'Garissa','2'),
       (130,'Garsen','2'),
       (131,'Gatara','2'),
       (132,'Gathiruini','2'),
       (133,'Gathugu','2'),
       (134,'Gatimbi','2'),
       (135,'Gatitu','2'),
       (136,'Gatondo','2'),
       (137,'Gatugura','2'),
       (138,'Gatukuyu','2'),
       (139,'Gatundu','2'),
       (140,'Gatunga','2'),
       (141,'Gatura','2'),
       (142,'Gede','2'),
       (143,'Gembe','2'),
       (144,'Gesima','2'),
       (145,'Gesusu','2'),
       (146,'Giakanja','2'),
       (147,'Gigiri','2'),
       (148,'Gikoe','2'),
       (149,'Gilgil','2'),
       (150,'Giribe','2'),
       (151,'Gisambai','2'),
       (152,'Githiga','2'),
       (153,'Githogo','2'),
       (154,'Githumu','2'),
       (155,'Githunguri','2'),
       (156,'Gitimene','2'),
       (157,'Gituamba','2'),
       (158,'Gitugi','2'),
       (159,'Gongini','2'),
       (160,'Gorgor','2'),
       (161,'Griftu','2'),
       (162,'Habaswein','2'),
       (163,'Hakati','2'),
       (164,'Hamisi','2'),
       (165,'Hawinga','2'),
       (166,'Highridge','2'),
       (167,'Hola','2'),
       (168,'Homa Bay','2'),
       (169,'Huruma','1'),
       (170,'Ichichi','2'),
       (171,'Igare','2'),
       (172,'Igoji','2'),
       (173,'Igwamiti','2'),
       (174,'Iiani','2'),
       (175,'Ikalaasa','2'),
       (176,'Ikerege','2'),
       (177,'Ikinu','2'),
       (178,'Ikonge','2'),
       (179,'Ikutha','2'),
       (180,'Ikuu','2'),
       (181,'Ilasit','2'),
       (182,'Ileho','2'),
       (183,'Imanga','2'),
       (184,'Ishiara','2'),
       (185,'Isibania','2'),
       (186,'Isinya','2'),
       (187,'Isiolo','2'),
       (188,'Isulu','2'),
       (189,'Iten','2'),
       (190,'Ithanga','2'),
       (191,'Itibo','2'),
       (192,'Itumbe','2'),
       (193,'Jebrok','2'),
       (194,'Juja Road','1'),
       (195,'Kaanwa','2'),
       (196,'Kabarak University','2'),
       (197,'Kabarnet','2'),
       (198,'Kabartonjo','2'),
       (199,'Kabati','2'),
       (200,'Kabazi','2'),
       (201,'Kabianga','2'),
       (202,'Kabiemit','2'),
       (203,'Kabiyet','2'),
       (204,'Kabujoi','2'),
       (205,'Kabula','2'),
       (206,'Kacheliba','2'),
       (207,'Kadel','2'),
       (208,'Kadongo','2'),
       (209,'Kaewa','2'),
       (210,'Kagio','2'),
       (211,'Kagumo','2'),
       (212,'Kagunduini','2'),
       (213,'Kagwe','2'),
       (214,'Kaheho','2'),
       (215,'Kahuhia','2'),
       (216,'Kahuro','2'),
       (217,'Kahuti','2'),
       (218,'Kaimosi','2'),
       (219,'Kainuk','2'),
       (220,'Kairo','2'),
       (221,'Kajiado','2'),
       (222,'Kakamega','2'),
       (223,'Kakemer','2'),
       (224,'Kakibora','2'),
       (225,'Kakoneni','2'),
       (226,'Kakuma','2'),
       (227,'Kakunga','2'),
       (228,'Kakuzi','2'),
       (229,'Kalamba','2'),
       (230,'Kalawa','2'),
       (231,'Kalimoni','2'),
       (232,'Kalokol','2'),
       (233,'Kaloleni','1'),
       (234,'Kamaget','2'),
       (235,'Kamahuha','2'),
       (236,'Kamara','2'),
       (237,'Kambiri','2'),
       (238,'Kambiti','2'),
       (239,'Kamiti','1'),
       (240,'KampiYaSamaki','2'),
       (241,'Kamuriai','2'),
       (242,'Kamuwongo','2'),
       (243,'Kamwaura','2'),
       (244,'Kamwosor','2'),
       (245,'Kandara','2'),
       (246,'Kandiege','2'),
       (247,'Kangari','2'),
       (248,'Kangema','2'),
       (249,'Kangemi','1'),
       (250,'Kangundo','2'),
       (251,'Kanja','2'),
       (252,'Kanjuku','2'),
       (253,'Kanyakine','2'),
       (254,'Kanyenyaini','2'),
       (255,'Kanyuambora','2'),
       (256,'Kapcheno','2'),
       (257,'Kapcherop','2'),
       (258,'Kapchorwa','2'),
       (259,'Kapedo','2'),
       (260,'Kapenguria','2'),
       (261,'Kapkatet','2'),
       (262,'Kapkelet','2'), 
       (263,'Kapkenda','2'),
       (264,'Kapkugerwet','2'),
       (265,'Kapngetuny','2'),
       (266,'Kapsabet','2'),
       (267,'Kapsara','2'),
       (268,'Kapsoit','2'),
       (269,'Kapsokwony','2'),
       (270,'Kapsowar','2'),
       (271,'Kapsumbeiwa','2'),
       (272,'Kapsuser','2'),
       (273,'Kaptagat','2'),
       (274,'Kaptalamwa','2'),
       (275,'Kaptama','2'),
       (276,'Kaptarakwa','2'),
       (277,'Kaptebengwet','2'),
       (278,'Kaptel','2'),
       (279,'Kapteren','2'),
       (280,'Karaba','2'),
       (281,'Karandi','2'),
       (282,'Karatina','2'),
       (283,'Karatu','2'),
       (284,'Karen','1'), 
       (285,'Karingari','2'),
       (286,'Kariobangi','2'),
       (287,'Kar999iua','2'), 
       (288,'Karota','2'),
       (289,'Karungu','2'),
       (290,'Karuri','2'),
       (291,'Karurumo','2'),
       (292,'Kasarani','1'),
       (293,'Kasigau','2'),
       (294,'Kasikeu','2'),
       (295,'Katangi','2'),
       (296,'Kathiani','2'),
       (297,'Kathonzweni','2'),
       (298,'Kathwana','2'),
       (299,'Katito','2'),
       (300,'Katse','2'),
       (301,'Katutu','2'),
       (302,'Kaviani','2'),
       (303,'Kavuti','2'),
       (304,'Kayole','1'),
       (305,'Kebirigo','2'),
       (306,'Kedowa','2'),
       (307,'Keekorok','2'),
       (308,'Kegogi','2'),
       (309,'Kegonga','2'),
       (310,'Kehancha','2'),
       (311,'Kendu Bay','2'),
       (312,'Kenol (Makuyu)','2'),
       (313,'Kenyatta National Hospital','1'),
       (314,'Kenyatta University','2'),
       (315,'Kenyenya','2'),
       (316,'Kericho','2'),
       (317,'Keroka','2'),
       (318,'Kerugoya','2'),
       (319,'Kerwa','2'), 
       (320,'Kesogon','2'), 
       (321,'Kesses','2'), 
       (322,'Keumbu','2'), 
       (323,'Kevote','2'), 
       (324,'Khayega','2'),
       (325,'Khumusalaba','2'), 
       (326,'Khwisero','2'), 
       (327,'Kiamariga','2'),
       (328,'Kiambere','2'), 
       (329,'Kiambu','2'), 
       (330,'Kiamokama','2'), 
       (331,'Kiamutugu','2'), 
       (332,'Kiamwangi','2'), 
       (333,'Kiandu','2'), 
       (334,'Kianjai','2'),
       (335,'Kianjokoma','2'),
       (336,'Kianyaga','2'), 
       (337,'Kibigori','2'), 
       (338,'Kibingoti','2'),
       (339,'Kibirichia','2'),
       (340,'Kibugu','2'),
       (341,'Kibwezi','2'),
       (342,'Kiganjo','2'),
       (343,'Kigumo','2'), 
       (344,'Kihoya','2'), 
       (345,'Kihuga Square','2'),
       (346,'Kiirua','2'), 
       (347,'Kijabe','2'), 
       (348,'Kikima','2'), 
       (349,'Kikuyu','2'), 
       (350,'Kilala','2'), 
       (351,'Kilgoris','2'), 
       (352,'Kilibwoni','2'), 
       (353,'Kilifi','2'), 
       (354,'Kilindini','2'), 
       (355,'Kilingili','2'), 
       (356,'Kimahuri','2'), 
       (357,'Kimana','2'), 
       (358,'Kimathi way','1'), 
       (359,'Kimbimbi','2'), 
       (360,'Kimilili','2'), 
       (361,'Kiminini','2'), 
       (362,'Kimoning','2'), 
       (363,'Kimulot','2'), 
       (364,'Kimunye','2'), 
       (365,'Kimwarer','2'), 
       (366,'Kinamba','2'), 
       (367,'Kinango','2'), 
       (368,'Kinari','2'), 
       (369,'Kindaruma','2'), 
       (370,'Kinoru','2'), 
       (371,'Kionyo','2'), 
       (372,'Kipevu','2'), 
       (373,'Kipkabus','2'), 
       (374,'Kipkarren River','2'), 
       (375,'Kipkelion','2'), 
       (376,'Kiplegetet','2'), 
       (377,'Kipsaina','2'), 
       (378,'Kipsaraman','2'), 
       (379,'Kiptabach','2'), 
       (380,'Kiptagich','2'), 
       (381,'Kiptangwanyi','2'), 
       (382,'Kiptere','2'), 
       (383,'Kiptugumo','2'), 
       (384,'Kirengeti','2'), 
       (385,'Kiriani','2'), 
       (386,'Kiritiri','2'), 
       (387,'Kiritu','2'), 
       (388,'Kiriua','2'), 
       (389,'Kiruara','2'), 
       (390,'Kisanana','2'), 
       (391,'Kisasi','2'), 
       (392,'Kiserian','2'), 
       (393,'Kisii','2'), 
       (394,'Kisumu','2'), 
       (395,'Kitale','2'), 
       (396,'Kitengela','2'), 
       (397,'Kithimani','2'), 
       (398,'Kithimu','2'), 
       (399,'Kithyoko','2'), 
       (400,'Kitise','2'), 
       (401,'Kitivo','2'), 
       (402,'Kitui','2'), 
       (403,'Kiunduani','2'), 
       (404,'Kiusyani','2'), 
       (405,'Kivaani','2'), 
       (406,'Kivunga','2'), 
       (407,'Kocholya','2'), 
       (408,'Koilot','2'), 
       (409,'Kojwang','2'), 
       (410,'Kola','2'), 
       (411,'Kombewa','2'), 
       (412,'Kondele','2'), 
       (413,'Kondik','2'), 
       (414,'Koracha','2'), 
       (415,'Koru','2'), 
       (416,'Kosele','2'), 
       (417,'Koyonzo','2'),
       (418,'Kuresoi','2'),
       (419,'Kutus','2'),
       (420,'Kwale','2'),
       (421,'Kwanza','2'),
       (422,'Kwavonza','2'),
       (423,'Kyatune','2'),
       (424,'Kyeni','2'),
       (425,'Kyuso','2'),
       (426,'Laare','2'),
       (427,'LadhriAwasi','2'),
       (428,'Laikipia Campus','2'),
       (429,'Laisamis','2'),
       (430,'Lamu','2'),
       (431,'Lanet','2'),
       (432,'Langas','2'),
       (433,'Langata','1'),
       (434,'Lavington','1'),
       (435,'Leshau','2'),
       (436,'Lessos','2'),
       (437,'Likoni','2'),
       (438,'Limuru','2'),
       (439,'Lita','2'),
       (440,'Litein','2'),
       (441,'Lodwar','2'),
       (442,'Loitoktok','2'),
       (443,'Loiyangalani','2'),
       (444,'Lokichoggio','2'),
       (445,'Lokitaung','2'),
       (446,'Lokori','2'),
       (447,'Lolgorian','2'),
       (448,'Londian','2'),
       (449,'Longisa','2'),
       (450,'Lower Kabete','2'),
       (451,'Luanda','2'),
       (452,'Luandanyi','2'),
       (453,'Luandeti','2'),
       (454,'Lubao','2'),
       (455,'Lugari','2'),
       (456,'Lugingo','2'),
       (457,'Luhano','2'),
       (458,'Lukolis','2'),
       (459,'Lukore','2'),
       (460,'Lukume','2'),
       (461,'Lumakanda','2'),
       (462,'LungaLunga','2'),
       (463,'Lunza','2'),
       (464,'Lusingeti','2'),
       (465,'Lusiola','2'),
       (466,'Lutaso','2'),
       (467,'Lwakhakha','2'),
       (468,'MaaiMahiu','2'),
       (469,'Mabusi','2'),
       (470,'Machakos','2'),
       (471,'Madaraka','2'),
       (472,'Madiany','2'),
       (473,'Madina','2'),
       (474,'Magada','2'),
       (475,'Magadi','2'),
       (476,'Magena','2'),
       (477,'Mago','2'),
       (478,'Magombo','2'),
       (479,'Magumoni','2'),
       (480,'Magunga','2'),
       (481,'Magutuni','2'),
       (482,'Magwagwa','2'),
       (483,'Mahanga','2'),
       (484,'MairoInya','2'),
       (485,'MajiMazuri','2'),
       (486,'Makimeny','2'),
       (487,'Makindu','2'),
       (488,'Makongeni','2'),
       (489,'Maktau','2'),
       (490,'Makueni','2'),
       (491,'Makumbi','2'),
       (492,'Makunga','2'),
       (493,'Makupa','2'),
       (494,'Makutano','2'),
       (495,'Makuyu','2'),
       (496,'Malaha','2'),
       (497,'Malakisi','2'), 
       (498,'Malava','2'), 
       (499,'Malindi','2'), 
       (500,'Malinya','2'), 
       (501,'Mandera','2'), 
       (502,'Manga','2'), 
       (503,'Manyani','2'), 
       (504,'Manyatta','2'), 
       (505,'Manyuanda','2'), 
       (506,'Manyulia','2'), 
       (507,'Maragoli','2'), 
       (508,'Maragua','2'), 
       (509,'Maralal','2'), 
       (510,'Marani','2'), 
       (511,'Mariakani','2'), 
       (512,'Marigat','2'), 
       (513,'Marima','2'),
       (514,'Marimanti','2'), 
       (515,'Mariwa','2'), 
       (516,'Marmanet','2'), 
       (517,'Marsabit','2'), 
       (518,'Masana','2'), 
       (519,'Maseno','2'), 
       (520,'Mashini','2'), 
       (521,'Mashuru','2'), 
       (522,'Masii','2'), 
       (523,'Masimba','2'), 
       (524,'MasindeMuliro University','2'), 
       (525,'Masinga','2'), 
       (526,'Matayos','2'), 
       (527,'Matete','2'), 
       (528,'Mathare Valley','2'), 
       (529,'Mathuki','2'), 
       (530,'Matiliku','2'), 
       (531,'Matinyani','2'), 
       (532,'Matuga','2'), 
       (533,'Matunda','2'), 
       (534,'Matuu','2'), 
       (535,'Mau Narok','2'), 
       (536,'Mau Summit','2'), 
       (537,'Maua','2'), 
       (538,'Maungu','2'), 
       (539,'Mavindini','2'), 
       (540,'Mawego','2'), 
       (541,'Mazeras','2'), 
       (542,'Mbagathi','2'), 
       (543,'Mbakalo','2'), 
       (544,'MbariYaNjiku','2'), 
       (545,'Mbiri','2'), 
       (546,'Mbita','2'), 
       (547,'Mbitini','2'), 
       (548,'Mbiuni','2'), 
       (549,'Mbumbuni','2'), 
       (550,'Mchumbi Road','2'), 
       (551,'Menengai','2'), 
       (552,'Merigi','2'), 
       (553,'Merti','2'), 
       (554,'Meru','2'), 
       (555,'Mfangano','2'), 
       (556,'Mgambonyi','2'), 
       (557,'Mgange','2'), 
       (558,'Miathene','2'), 
       (559,'Migioini','2'), 
       (560,'Migwani','2'), 
       (561,'Miharati','2'), 
       (562,'Mikayi','2'), 
       (563,'Mikinduri','2'), 
       (564,'Milimani','2'), 
       (565,'Milton Siding','2'), 
       (566,'Mirangine','2'), 
       (567,'Mirogi','2'), 
       (568,'Misikhu','2'), 
       (569,'Misori','2'), 
       (570,'Mitaboni','2'), 
       (571,'Mitunguu','2'), 
       (572,'Miu','2'), 
       (573,'Miwani','2'), 
       (574,'Mkomani','2'), 
       (575,'Mobi Plaza','2'), 
       (576,'Mochongoi','2'), 
       (577,'Mogogosiek','2'), 
       (578,'Mogotio','2'), 
       (579,'Moi Airport','2'), 
       (580,'Moi University','2'), 
       (581,'Moi-ben','2'), 
       (582,'moi`s Bridge','2'), 
       (583,'Mokomoni','2'), 
       (584,'Mokowe','2'), 
       (585,'Molo','2'), 
       (586,'Mombasa','2'), 
       (587,'Mosoriot','2'), 
       (588,'Moyale','2'), 
       (589,'Mpeketoni','2'), 
       (590,'Msambweni','2'), 
       (591,'MtitoAndei','2'), 
       (592,'Mtongwe','2'), 
       (593,'Mtopanga','2'), 
       (594,'Mtwapa','2'), 
       (595,'Mubwayo','2'), 
       (596,'MuddoGashe','2'), 
       (597,'Mudhiero','2'), 
       (598,'Muguga','2'), 
       (599,'Mugunda','2'), 
       (600,'Muhoroni','2'), 
       (601,'Muhotetu','2'), 
       (602,'Muhuru Bay','2'), 
       (603,'Mukerenju','2'), 
       (604,'Mukeu','2'), 
       (605,'Mukuro','2'), 
       (606,'Mukurweini','2'), 
       (607,'Mulango','2'), 
       (608,'Muluanda','2'), 
       (609,'Mumias','2'), 
       (610,'Mundoro','2'), 
       (611,'Mungatsi','2'), 
       (612,'Muranga','2'), 
       (613,'Muruka','2'), 
       (614,'Murumba','2'), 
       (615,'Murungaru','2'), 
       (616,'Mururi','2'), 
       (617,'Musanda','2'), 
       (618,'Mutha','2'), 
       (619,'Muthaiga','2'), 
       (620,'Muthetheni','2'), 
       (621,'Mutituni','2'), 
       (622,'Mutomo','2'), 
       (623,'Mutumbu','2'), 
       (624,'Muumandu','2'),
       (625,'Mwala','2'),
       (626,'Mwatate','2'),
       (627,'Mweiga','2'),
       (628,'Mwingi','2'),
       (629,'NairageEnkare','2'), 
       (630,'Nairobi GPO','1'), 
       (631,'Naishi','2'), 
       (632,'Naitiri','2'), 
       (633,'Naivasha','2'), 
       (634,'Nakuru','2'), 
       (635,'Namanga','2'), 
       (636,'Nambacha','2'), 
       (637,'Nambale','2'), 
       (638,'Nandi Hills','2'), 
       (639,'Nangili','2'), 
       (640,'Nango','2'), 
       (641,'Nanyuki','2'), 
       (642,'Naromoru','2'),
       (643,'Narok','2'), 
       (644,'Ndalani','2'),
       (645,'Ndalat','2'),
       (646,'Ndalu','2'),
       (647,'Ndanai','2'),
       (648,'Ndaragwa','2'),
       (649,'Ndenderu','2'),
       (650,'Ndere','2'),
       (651,'Nderu','2'),
       (652,'Ndhiwa','2'),
       (653,'Ndigwa','2'),
       (654,'Ndithini','2'),
       (655,'Ndooa','2'),
       (656,'Ndori','2'),
       (657,'NdunyuNjeru','2'),
       (658,'Ngambwa','2'),
       (659,'Nganduri','2'),
       (660,'Ngara Road','1'),
       (661,'Ngecha','2'),
       (662,'Ngewa','2'),
       (663,'Nginyang','2'),
       (664,'Ngiya','2'),
       (665,'Ngong Hills','2'),
       (666,'Ngong Road','1'),
       (667,'Ngorika','2'),
       (668,'Nguni','2'),
       (669,'Nguyoini','2'),
       (670,'Ngwata','2'),
       (671,'Njipiship','2'),
       (672,'Njoro','2'),
       (673,'Nkondi','2'),
       (674,'Nkubu','2'),
       (675,'North Kinangop','2'),
       (676,'Nthongoini','2'),
       (677,'Ntimaru','2'),
       (678,'Nunguni','2'),
       (679,'Nuu','2'),
       (680,'Nyabondo','2'),
       (681,'Nyandorera','2'),
       (682,'Nyahururu','2'),
       (683,'Nyali','2'),
       (684,'Nyamache','2'),
       (685,'Nyamarambe','2'),
       (686,'Nyambunwa','2'),
       (687,'Nyamira','2'),
       (688,'Nyamonye','2'),
       (689,'Nyadhiwa','2'),
       (690,'Nyangande','2'),
       (691,'Nyangori','2'),
       (692,'Nyangusu','2'),
       (693,'Nyangweso','2'),
       (694,'Nyansiongo','2'),
       (695,'Nyaramba','2'), 
       (696,'Nyaru','2'), 
       (697,'Nyatike','2'), 
       (698,'Nyawara','2'), 
       (699,'Nyayo Stadium','1'), 
       (700,'Nyeri','2'), 
       (701,'Nyilima','2'), 
       (702,'Nzeeka','2'), 
       (703,'Nziu','2'), 
       (704,'Nzoia','2'), 
       (705,'Obekai','2'), 
       (706,'Oboch','2'), 
       (707,'Ogembo','2'),
       (708,'Ogen','2'), 
       (709,'Ogongo','2'), 
       (710,'Okia','2'), 
       (711,'OlJoroOrok','2'), 
       (712,'OlKalou','2'), 
       (713,'Olbutyo','2'), 
       (714,'Olenguruone','2'), 
       (715,'Olkurto','2'), 
       (716,'Olololunga','2'), 
       (717,'Oloomirani','2'), 
       (718,'Oltepesi','2'), 
       (719,'Omboga','2'), 
       (720,'Omogonchoro','2'), 
       (721,'OngataRongai','2'), 
       (722,'Oriang','2'),  
       (723,'Ortum','2'), 
       (724,'Otaro','2'), 
       (725,'Othaya','2'),
       (726,'OthochRakuom','2'),
       (727,'Othoro','2'), 
       (728,'Otonglo','2'),
       (729,'Oyani-masii','2'), 
       (730,'Oyugis','2'), 
       (731,'Pala','2'), 
       (732,'Pap Onditi','2'), 
       (733,'Parklands','1'), 
       (734,'Passenga','2'), 
       (735,'Paw Akuche','2'), 
       (736,'PembeTatu','2'), 
       (737,'Plateau','2'), 
       (738,'Port Victoria','2'), 
       (739,'Quarry Road','2'), 
       (740,'Rabuor','2'), 
       (741,'Racecourse Road','2'),  
       (742,'Ragengni','2'), 
       (743,'Rakwaro','2'), 
       (744,'Ramba','2'), 
       (745,'Ramula','2'), 
       (746,'Ranen','2'), 
       (747,'Rangala','2'), 
       (748,'Rangwe','2'), 
       (749,'Rapogi','2'), 
       (750,'Ratta','2'), 
       (751,'Reru','2'), 
       (752,'Rhamu','2'), 
       (753,'Rigoma','2'), 
       (754,'Ringa','2'), 
       (755,'Riochanda','2'), 
       (756,'Riosiri','2'), 
       (757,'Riruta','2'), 
       (758,'RodiKopany','2'), 
       (759,'Ronald Ngala Street','2'), 
       (760,'Ronda','2'), 
       (761,'Rongai','2'), 
       (762,'Rongo','2'), 
       (763,'Roret','2'), 
       (764,'Ruaraka','2'), 
       (765,'Ruiru','2'), 
       (766,'Rumuruti','2'), 
       (767,'Runyenjes','2'), 
       (768,'Ruri','2'), 
       (769,'Ruringu','2'), 
       (770,'Rusinga','2'), 
       (771,'Ruthangati','2'), 
       (772,'Sabatia','2'), 
       (773,'Saboti','2'), 
       (774,'Sagalla','2'), 
       (775,'Sagana','2'), 
       (776,'Samburu','2'), 
       (777,'Samitsi','2'), 
       (778,'Sare','2'), 
       (779,'Sarit Centre','1'), 
       (780,'Sasumua Road','2'), 
       (781,'Sawagongo postal','2'), 
       (782,'Sega','2'), 
       (783,'Serem','2'), 
       (784,'Seretunin','2'), 
       (785,'Shabaab','2'), 
       (786,'Shianda','2'), 
       (787,'Shiatsala','2'), 
       (788,'Shibuli','2'), 
       (789,'Shimanyiro','2'), 
       (790,'Shimba Hills','2'), 
       (791,'Shinyalu','2'), 
       (792,'Siakago','2'), 
       (793,'Siaya','2'), 
       (794,'Sidindi','2'), 
       (795,'Sifuyo','2'), 
       (796,'Sigomre','2'),
       (797,'Sigor','2'), 
       (798,'Sigoti','2'),
       (799,'Sigowet','2'),
       (800,'Sikinwa','2'), 
       (801,'Silibwet','2'), 
       (802,'Simat','2'), 
       (803,'Sindo','2'), 
       (804,'Singore','2'),
       (805,'Sio Port','2'), 
       (806,'Sipili','2'),
       (807,'Sirembe','2'),
       (808,'Sirende','2'), 
       (809,'Sirisia','2'), 
       (810,'Sirongo','2'), 
       (811,'Solai','2'), 
       (812,'Sololo','2'),
       (813,'Sondu','2'), 
       (814,'Songhor','2'),
       (815,'Sorget','2'), 
       (816,'Sosiot','2'), 
       (817,'Sotik','2'), 
       (818,'South Horr','2'), 
       (819,'South Kinangop','2'),
       (820,'South Kinangop','2'),
       (821,'Soy','2'),
       (822,'SubaKuria','2'),
       (823,'Subukia','2'), 
       (824,'Suguta Mar Mar','2'), 
       (825,'Sulmac','2'), 
       (826,'Sultan Hamud','2'), 
       (827,'Suna','2'), 
       (828,'Suwerwa','2'), 
       (829,'Tabani','2'), 
       (830,'Tabani','2'), 
       (831,'Tala','2'), 
       (832,'Tambach','2'), 
       (833,'Tarasaa','2'), 
       (834,'Tausa','2'), 
       (835,'Taveta','2'), 
       (836,'Tawa','2'), 
       (837,'Tenges','2'), 
       (838,'Thaara','2'), 
       (839,'Thangathi','2'), 
       (840,'Thare','2'), 
       (841,'Thigio','2'), 
       (842,'Thika','2'), 
       (843,'Tigiji','2'), 
       (844,'Timau','2'), 
       (845,'Timber Mill Road','2'),  
       (846,'Timboroa','2'), 
       (847,'Tiriki','2'), 
       (848,'Tom Mboya','1'), 
       (849,'Tombe','2'), 
       (850,'Tongaren','2'), 
       (851,'Torongo','2'), 
       (852,'Tot','2'), 
       (853,'Tseikuru','2'), 
       (854,'Tulia','2'), 
       (855,'TumuTumu','2'), 
       (856,'Tunyai','2'), 
       (857,'Turbo','2'), 
       (858,'Turi','2'), 
       (859,'UasoNyiro','2'), 
       (860,'Ugunja','2'), 
       (861,'Uhuru Gardens','2'), 
       (862,'Ukunda','2'), 
       (863,'Ukwala','2'), 
       (864,'Uplands','2'), 
       (865,'Uranga','2'), 
       (866,'Uriri','2'), 
       (867,'Usenge','2'), 
       (868,'Usigu','2'), 
       (869,'Uthiru','2'), 
       (870,'Valley Arcade','2'), 
       (871,'Vihiga','2'), 
       (872,'Village Market','1'), 
       (873,'Vipingo','2'), 
       (874,'Vitengeni','2'), 
       (875,'Viwandani','2'), 
       (876,'Voi','2'), 
       (877,'Voo','2'), 
       (878,'Wagusu','2'), 
       (879,'Waithaka','2'), 
       (880,'Wajir','2'), 
       (881,'Wamagana','2'), 
       (882,'Wamba','2'), 
       (883,'Wamunyu','2'), 
       (884,'Wamwangi','2'), 
       (885,'Wangige','2'), 
       (886,'Wanguru','2'), 
       (887,'Wanjengi','2'), 
       (888,'Wanjohi','2'), 
       (889,'Watalii Road','2'), 
       (890,'Watamu','2'), 
       (891,'Webuye','2'), 
       (892,'Weiwei','2'), 
       (893,'Werugha','2'), 
       (894,'Westlands','1'), 
       (895,'Winam','2'), 
       (896,'Witu','2'), 
       (897,'Wiyumiririe','2'), 
       (898,'Wodanga','2'), 
       (899,'Wundanyi','2'), 
       (900,'Yala','2'), 
       (901,'Yaya','2'), 
       (902,'Yoani','2'), 
       (903,'Ziwa','2'), 
       (904,'Zombe','2');

-- Populate shipping table
INSERT INTO `shipping` (`shipping_id`,   `shipping_type`,
                        `shipping_cost`, `shipping_region_id`) VALUES
       (1, 'Next Day Delivery ($20)', 20.00, 2),
       (2, '3-4 Days ($10)',          10.00, 2),
       (3, '7 Days ($5)',              5.00, 2),
       (4, 'By air (7 days, $25)',    25.00, 3),
       (5, 'By sea (28 days, $10)',   10.00, 3),
       (6, 'By air (10 days, $35)',   35.00, 4),
       (7, 'By sea (28 days, $30)',   30.00, 4);

-- Populate tax table
INSERT INTO `tax` (`tax_id`, `tax_type`, `tax_percentage`) VALUES
       (1, 'Sales Tax at 8.5%', 8.50),
       (2, 'No Tax',            0.00);

-- Change DELIMITER to $$
DELIMITER $$

-- Create catalog_get_departments_list stored procedure
CREATE PROCEDURE catalog_get_departments_list()
BEGIN
  SELECT department_id, name FROM department ORDER BY department_id;
END$$

-- Create catalog_get_department_details stored procedure
CREATE PROCEDURE catalog_get_department_details(IN inDepartmentId INT)
BEGIN
  SELECT name, description
  FROM   department
  WHERE  department_id = inDepartmentId;
END$$

-- Create catalog_get_categories_list stored procedure
CREATE PROCEDURE catalog_get_categories_list(IN inDepartmentId INT)
BEGIN
  SELECT   category_id, name
  FROM     category
  WHERE    department_id = inDepartmentId
  ORDER BY category_id;
END$$

-- Create catalog_get_category_details stored procedure
CREATE PROCEDURE catalog_get_category_details(IN inCategoryId INT)
BEGIN
  SELECT name, description
  FROM   category
  WHERE  category_id = inCategoryId;
END$$

-- Create catalog_count_products_in_category stored procedure
CREATE PROCEDURE catalog_count_products_in_category(IN inCategoryId INT)
BEGIN
  SELECT     COUNT(*) AS categories_count
  FROM       product p
  INNER JOIN product_category pc
               ON p.product_id = pc.product_id
  WHERE      pc.category_id = inCategoryId;
END$$

-- Create catalog_get_products_in_category stored procedure
CREATE PROCEDURE catalog_get_products_in_category(
  IN inCategoryId INT, IN inShortProductDescriptionLength INT,
  IN inProductsPerPage INT, IN inStartItem INT)
BEGIN
  -- Prepare statement
  PREPARE statement FROM
   "SELECT     p.product_id, p.name,
               IF(LENGTH(p.description) <= ?,
                  p.description,
                  CONCAT(LEFT(p.description, ?),
                         '...')) AS description,
               p.price, p.discounted_price, p.thumbnail, p.image
    FROM       product p
    INNER JOIN product_category pc
                 ON p.product_id = pc.product_id
    WHERE      pc.category_id = ?
    ORDER BY   p.display DESC
    LIMIT      ?, ?";

  -- Define query parameters
  SET @p1 = inShortProductDescriptionLength; 
  SET @p2 = inShortProductDescriptionLength; 
  SET @p3 = inCategoryId;
  SET @p4 = inStartItem; 
  SET @p5 = inProductsPerPage; 

  -- Execute the statement
  EXECUTE statement USING @p1, @p2, @p3, @p4, @p5;
END$$

-- Create catalog_count_products_on_department stored procedure
CREATE PROCEDURE catalog_count_products_on_department(IN inDepartmentId INT)
BEGIN
  SELECT DISTINCT COUNT(*) AS products_on_department_count
  FROM            product p
  INNER JOIN      product_category pc
                    ON p.product_id = pc.product_id
  INNER JOIN      category c
                    ON pc.category_id = c.category_id
  WHERE           (p.display = 2 OR p.display = 3)
                  AND c.department_id = inDepartmentId;
END$$

-- Create catalog_get_products_on_department stored procedure
CREATE PROCEDURE catalog_get_products_on_department(
  IN inDepartmentId INT, IN inShortProductDescriptionLength INT,
  IN inProductsPerPage INT, IN inStartItem INT)
BEGIN
  PREPARE statement FROM
    "SELECT DISTINCT p.product_id, p.name,
                     IF(LENGTH(p.description) <= ?,
                        p.description,
                        CONCAT(LEFT(p.description, ?),
                               '...')) AS description,
                     p.price, p.discounted_price, p.thumbnail, p.image, p.display
     FROM            product p
     INNER JOIN      product_category pc
                       ON p.product_id = pc.product_id
     INNER JOIN      category c
                       ON pc.category_id = c.category_id
     WHERE           (p.display = 2 OR p.display = 3)
                     AND c.department_id = ?
     ORDER BY        p.display DESC
     LIMIT           ?, ?";

  SET @p1 = inShortProductDescriptionLength;
  SET @p2 = inShortProductDescriptionLength;
  SET @p3 = inDepartmentId;
  SET @p4 = inStartItem;
  SET @p5 = inProductsPerPage;

  EXECUTE statement USING @p1, @p2, @p3, @p4, @p5;
END$$

-- Create catalog_count_products_on_catalog stored procedure
CREATE PROCEDURE catalog_count_products_on_catalog()
BEGIN
  SELECT COUNT(*) AS products_on_catalog_count
  FROM   product
  WHERE  display = 1 OR display = 3;
END$$

-- Create catalog_get_products_on_catalog stored procedure
CREATE PROCEDURE catalog_get_products_on_catalog(
  IN inShortProductDescriptionLength INT,
  IN inProductsPerPage INT, IN inStartItem INT)
BEGIN
  PREPARE statement FROM
    "SELECT   p.product_id, p.name,
              IF(LENGTH(p.description) <= ?,
                 p.description,
                 CONCAT(LEFT(p.description, ?),
                        '...')) AS description,
              p.price, p.discounted_price, p.thumbnail, p.display
     FROM     product p
     WHERE    p.display = 1 OR p.display = 3
     ORDER BY p.display DESC
     LIMIT    ?, ?";

  SET @p1 = inShortProductDescriptionLength;
  SET @p2 = inShortProductDescriptionLength;
  SET @p3 = inStartItem;
  SET @p4 = inProductsPerPage;

  EXECUTE statement USING @p1, @p2, @p3, @p4;
END$$

-- Create catalog_get_product_details stored procedure
CREATE PROCEDURE catalog_get_product_details(IN inProductId INT)
BEGIN
  SELECT product_id, name, description,
         price, discounted_price, image, image_2
  FROM   product
  WHERE  product_id = inProductId;
END$$

-- Create catalog_get_product_locations stored procedure
CREATE PROCEDURE catalog_get_product_locations(IN inProductId INT)
BEGIN
  SELECT c.category_id, c.name AS category_name, c.department_id,
         (SELECT name
          FROM   department
          WHERE  department_id = c.department_id) AS department_name
          -- Subquery returns the name of the department of the category
  FROM   category c
  WHERE  c.category_id IN
           (SELECT category_id
            FROM   product_category
            WHERE  product_id = inProductId);
            -- Subquery returns the category IDs a product belongs to
END$$

-- Create catalog_get_product_attributes stored procedure
CREATE PROCEDURE catalog_get_product_attributes(IN inProductId INT)
BEGIN
  SELECT     a.name AS attribute_name,
             av.attribute_value_id, av.value AS attribute_value
  FROM       attribute_value av
  INNER JOIN attribute a
               ON av.attribute_id = a.attribute_id
  WHERE      av.attribute_value_id IN
               (SELECT attribute_value_id
                FROM   product_attribute
                WHERE  product_id = inProductId)
  ORDER BY   a.name;
END$$

-- Create catalog_get_department_name stored procedure
CREATE PROCEDURE catalog_get_department_name(IN inDepartmentId INT)
BEGIN
  SELECT name FROM department WHERE department_id = inDepartmentId;
END$$

-- Create catalog_get_category_name stored procedure
CREATE PROCEDURE catalog_get_category_name(IN inCategoryId INT)
BEGIN
  SELECT name FROM category WHERE category_id = inCategoryId;
END$$

-- Create catalog_get_product_name stored procedure
CREATE PROCEDURE catalog_get_product_name(IN inProductId INT)
BEGIN
  SELECT name FROM product WHERE product_id = inProductId;
END$$

-- Create catalog_count_search_result stored procedure
CREATE PROCEDURE catalog_count_search_result(
  IN inSearchString TEXT, IN inAllWords VARCHAR(3))
BEGIN
  IF inAllWords = "on" THEN
    PREPARE statement FROM
      "SELECT   count(*)
       FROM     product
       WHERE    MATCH (name, description) AGAINST (? IN BOOLEAN MODE)";
  ELSE
    PREPARE statement FROM
      "SELECT   count(*)
       FROM     product
       WHERE    MATCH (name, description) AGAINST (?)";
  END IF;

  SET @p1 = inSearchString;

  EXECUTE statement USING @p1;
END$$

-- Create catalog_search stored procedure
CREATE PROCEDURE catalog_search(
  IN inSearchString TEXT, IN inAllWords VARCHAR(3),
  IN inShortProductDescriptionLength INT,
  IN inProductsPerPage INT, IN inStartItem INT)
BEGIN
  IF inAllWords = "on" THEN
    PREPARE statement FROM
      "SELECT   product_id, name, image,
                IF(LENGTH(description) <= ?,
                   description,
                   CONCAT(LEFT(description, ?),
                          '...')) AS description,
                price, discounted_price, thumbnail
       FROM     product
       WHERE    MATCH (name, description)
                AGAINST (? IN BOOLEAN MODE)
       ORDER BY MATCH (name, description)
                AGAINST (? IN BOOLEAN MODE) DESC
       LIMIT    ?, ?";
  ELSE
    PREPARE statement FROM
      "SELECT   product_id, name, image,
                IF(LENGTH(description) <= ?,
                   description,
                   CONCAT(LEFT(description, ?),
                          '...')) AS description,
                price, discounted_price, thumbnail
       FROM     product
       WHERE    MATCH (name, description) AGAINST (?)
       ORDER BY MATCH (name, description) AGAINST (?) DESC
       LIMIT    ?, ?";
  END IF;

  SET @p1 = inShortProductDescriptionLength;
  SET @p2 = inSearchString;
  SET @p3 = inStartItem;
  SET @p4 = inProductsPerPage;

  EXECUTE statement USING @p1, @p1, @p2, @p2, @p3, @p4;
END$$

-- Create catalog_get_departments stored procedure
CREATE PROCEDURE catalog_get_departments()
BEGIN
  SELECT   department_id, name, description
  FROM     department
  ORDER BY department_id;
END$$

-- Create catalog_add_department stored procedure
CREATE PROCEDURE catalog_add_department(
  IN inName VARCHAR(100), IN inDescription VARCHAR(1000))
BEGIN
  INSERT INTO department (name, description)
         VALUES (inName, inDescription);
END$$

-- Create catalog_update_department stored procedure
CREATE PROCEDURE catalog_update_department(IN inDepartmentId INT,
  IN inName VARCHAR(100), IN inDescription VARCHAR(1000))
BEGIN
  UPDATE department
  SET    name = inName, description = inDescription
  WHERE  department_id = inDepartmentId;
END$$

-- Create catalog_delete_department stored procedure
CREATE PROCEDURE catalog_delete_department(IN inDepartmentId INT)
BEGIN
  DECLARE categoryRowsCount INT;

  SELECT count(*)
  FROM   category
  WHERE  department_id = inDepartmentId
  INTO   categoryRowsCount;
  
  IF categoryRowsCount = 0 THEN
    DELETE FROM department WHERE department_id = inDepartmentId;

    SELECT 1;
  ELSE
    SELECT -1;
  END IF;
END$$

-- Create catalog_get_department_categories stored procedure
CREATE PROCEDURE catalog_get_department_categories(IN inDepartmentId INT)
BEGIN
  SELECT   category_id, name, description
  FROM     category
  WHERE    department_id = inDepartmentId
  ORDER BY category_id;
END$$

-- Create catalog_add_category stored procedure
CREATE PROCEDURE catalog_add_category(IN inDepartmentId INT,
  IN inName VARCHAR(100), IN inDescription VARCHAR(1000))
BEGIN
  INSERT INTO category (department_id, name, description)
         VALUES (inDepartmentId, inName, inDescription);
END$$

-- Create catalog_update_category stored procedure
CREATE PROCEDURE catalog_update_category(IN inCategoryId INT,
  IN inName VARCHAR(100), IN inDescription VARCHAR(1000))
BEGIN
    UPDATE category
    SET    name = inName, description = inDescription
    WHERE  category_id = inCategoryId;
END$$

-- Create catalog_delete_category stored procedure
CREATE PROCEDURE catalog_delete_category(IN inCategoryId INT)
BEGIN
  DECLARE productCategoryRowsCount INT;

  SELECT      count(*)
  FROM        product p
  INNER JOIN  product_category pc
                ON p.product_id = pc.product_id
  WHERE       pc.category_id = inCategoryId
  INTO        productCategoryRowsCount;

  IF productCategoryRowsCount = 0 THEN
    DELETE FROM category WHERE category_id = inCategoryId;

    SELECT 1;
  ELSE
    SELECT -1;
  END IF;
END$$

-- Create catalog_get_attributes stored procedure
CREATE PROCEDURE catalog_get_attributes()
BEGIN
  SELECT attribute_id, name FROM attribute ORDER BY attribute_id;
END$$

-- Create catalog_add_attribute stored procedure
CREATE PROCEDURE catalog_add_attribute(IN inName VARCHAR(100))
BEGIN
  INSERT INTO attribute (name) VALUES (inName);
END$$

-- Create catalog_update_attribute stored procedure
CREATE PROCEDURE catalog_update_attribute(
  IN inAttributeId INT, IN inName VARCHAR(100))
BEGIN
  UPDATE attribute SET name = inName WHERE attribute_id = inAttributeId;
END$$

-- Create catalog_delete_attribute stored procedure
CREATE PROCEDURE catalog_delete_attribute(IN inAttributeId INT)
BEGIN
  DECLARE attributeRowsCount INT;

  SELECT count(*)
  FROM   attribute_value
  WHERE  attribute_id = inAttributeId
  INTO   attributeRowsCount;

  IF attributeRowsCount = 0 THEN
    DELETE FROM attribute WHERE attribute_id = inAttributeId;

    SELECT 1;
  ELSE
    SELECT -1;
  END IF;
END$$

-- Create catalog_get_attribute_details stored procedure
CREATE PROCEDURE catalog_get_attribute_details(IN inAttributeId INT)
BEGIN
  SELECT attribute_id, name
  FROM   attribute
  WHERE  attribute_id = inAttributeId;
END$$

-- Create catalog_get_attribute_values stored procedure
CREATE PROCEDURE catalog_get_attribute_values(IN inAttributeId INT)
BEGIN
  SELECT   attribute_value_id, value
  FROM     attribute_value
  WHERE    attribute_id = inAttributeId
  ORDER BY attribute_id;
END$$

-- Create catalog_add_attribute_value stored procedure
CREATE PROCEDURE catalog_add_attribute_value(
  IN inAttributeId INT, IN inValue VARCHAR(100))
BEGIN
  INSERT INTO attribute_value (attribute_id, value)
         VALUES (inAttributeId, inValue);
END$$

-- Create catalog_update_attribute_value stored procedure
CREATE PROCEDURE catalog_update_attribute_value(
  IN inAttributeValueId INT, IN inValue VARCHAR(100))
BEGIN
    UPDATE attribute_value
    SET    value = inValue
    WHERE  attribute_value_id = inAttributeValueId;
END$$

-- Create catalog_delete_attribute_value stored procedure
CREATE PROCEDURE catalog_delete_attribute_value(IN inAttributeValueId INT)
BEGIN
  DECLARE productAttributeRowsCount INT;

  SELECT      count(*)
  FROM        product p
  INNER JOIN  product_attribute pa
                ON p.product_id = pa.product_id
  WHERE       pa.attribute_value_id = inAttributeValueId
  INTO        productAttributeRowsCount;

  IF productAttributeRowsCount = 0 THEN
    DELETE FROM attribute_value WHERE attribute_value_id = inAttributeValueId;

    SELECT 1;
  ELSE
    SELECT -1;
  END IF;
END$$

-- Create catalog_get_category_products stored procedure
CREATE PROCEDURE catalog_get_category_products(IN inCategoryId INT)
BEGIN
  SELECT     p.product_id, p.name, p.description, p.price,
             p.discounted_price
  FROM       product p
  INNER JOIN product_category pc
               ON p.product_id = pc.product_id
  WHERE      pc.category_id = inCategoryId
  ORDER BY   p.product_id;
END$$

-- Create catalog_add_product_to_category stored procedure
CREATE PROCEDURE catalog_add_product_to_category(IN inCategoryId INT,
  IN inName VARCHAR(100), IN inDescription VARCHAR(1000),
  IN inPrice DECIMAL(10, 2))
BEGIN
  DECLARE productLastInsertId INT;

  INSERT INTO product (name, description, price)
         VALUES (inName, inDescription, inPrice);

  SELECT LAST_INSERT_ID() INTO productLastInsertId;

  INSERT INTO product_category (product_id, category_id)
         VALUES (productLastInsertId, inCategoryId);
END$$

-- Create catalog_update_product stored procedure
CREATE PROCEDURE catalog_update_product(IN inProductId INT,
  IN inName VARCHAR(100), IN inDescription VARCHAR(1000),
  IN inPrice DECIMAL(10, 2), IN inDiscountedPrice DECIMAL(10, 2))
BEGIN
  UPDATE product
  SET    name = inName, description = inDescription, price = inPrice,
         discounted_price = inDiscountedPrice
  WHERE  product_id = inProductId;
END$$

-- Create catalog_remove_product_from_category stored procedure
CREATE PROCEDURE catalog_remove_product_from_category(
  IN inProductId INT, IN inCategoryId INT)
BEGIN
  DECLARE productCategoryRowsCount INT;

  SELECT count(*)
  FROM   product_category
  WHERE  product_id = inProductId
  INTO   productCategoryRowsCount;

  IF productCategoryRowsCount = 1 THEN
    CALL catalog_delete_product(inProductId);

    SELECT 0;
  ELSE
    DELETE FROM product_category
    WHERE  category_id = inCategoryId AND product_id = inProductId;

    SELECT 1;
  END IF;
END$$

-- Create catalog_get_categories stored procedure
CREATE PROCEDURE catalog_get_categories()
BEGIN
  SELECT   category_id, name, description
  FROM     category
  ORDER BY category_id;
END$$

-- Create catalog_get_product_info stored procedure
CREATE PROCEDURE catalog_get_product_info(IN inProductId INT)
BEGIN
  SELECT product_id, name, description, price, discounted_price,
         image, image_2, thumbnail, display
  FROM   product
  WHERE  product_id = inProductId;
END$$

-- Create catalog_get_categories_for_product stored procedure
CREATE PROCEDURE catalog_get_categories_for_product(IN inProductId INT)
BEGIN
  SELECT   c.category_id, c.department_id, c.name
  FROM     category c
  JOIN     product_category pc
             ON c.category_id = pc.category_id
  WHERE    pc.product_id = inProductId
  ORDER BY category_id;
END$$

-- Create catalog_set_product_display_option stored procedure
CREATE PROCEDURE catalog_set_product_display_option(
  IN inProductId INT, IN inDisplay SMALLINT)
BEGIN
  UPDATE product SET display = inDisplay WHERE product_id = inProductId;
END$$

-- Create catalog_assign_product_to_category stored procedure
CREATE PROCEDURE catalog_assign_product_to_category(
  IN inProductId INT, IN inCategoryId INT)
BEGIN
  INSERT INTO product_category (product_id, category_id)
         VALUES (inProductId, inCategoryId);
END$$

-- Create catalog_move_product_to_category stored procedure
CREATE PROCEDURE catalog_move_product_to_category(IN inProductId INT,
  IN inSourceCategoryId INT, IN inTargetCategoryId INT)
BEGIN
  UPDATE product_category
  SET    category_id = inTargetCategoryId
  WHERE  product_id = inProductId
         AND category_id = inSourceCategoryId;
END$$

-- Create catalog_get_attributes_not_assigned_to_product stored procedure
CREATE PROCEDURE catalog_get_attributes_not_assigned_to_product(
  IN inProductId INT)
BEGIN
  SELECT     a.name AS attribute_name,
             av.attribute_value_id, av.value AS attribute_value
  FROM       attribute_value av
  INNER JOIN attribute a
               ON av.attribute_id = a.attribute_id
  WHERE      av.attribute_value_id NOT IN
             (SELECT attribute_value_id
              FROM   product_attribute
              WHERE  product_id = inProductId)
  ORDER BY   attribute_name, av.attribute_value_id;
END$$

-- Create catalog_assign_attribute_value_to_product stored procedure
CREATE PROCEDURE catalog_assign_attribute_value_to_product(
  IN inProductId INT, IN inAttributeValueId INT)
BEGIN
  INSERT INTO product_attribute (product_id, attribute_value_id)
         VALUES (inProductId, inAttributeValueId);
END$$

-- Create catalog_remove_product_attribute_value stored procedure
CREATE PROCEDURE catalog_remove_product_attribute_value(
  IN inProductId INT, IN inAttributeValueId INT)
BEGIN
  DELETE FROM product_attribute
  WHERE       product_id = inProductId AND
              attribute_value_id = inAttributeValueId;
END$$

-- Create catalog_set_image stored procedure
CREATE PROCEDURE catalog_set_image(
  IN inProductId INT, IN inImage VARCHAR(150))
BEGIN
  UPDATE product SET image = inImage WHERE product_id = inProductId;
END$$

-- Create catalog_set_image_2 stored procedure
CREATE PROCEDURE catalog_set_image_2(
  IN inProductId INT, IN inImage VARCHAR(150))
BEGIN
  UPDATE product SET image_2 = inImage WHERE product_id = inProductId;
END$$

-- Create catalog_set_thumbnail stored procedure
CREATE PROCEDURE catalog_set_thumbnail(
  IN inProductId INT, IN inThumbnail VARCHAR(150))
BEGIN
  UPDATE product
  SET    thumbnail = inThumbnail
  WHERE  product_id = inProductId;
END$$

-- Create shopping_cart_add_product stored procedure
CREATE PROCEDURE shopping_cart_add_product(IN inCartId CHAR(32),
  IN inProductId INT, IN inAttributes VARCHAR(1000))
BEGIN
  DECLARE productQuantity INT;

  -- Obtain current shopping cart quantity for the product
  SELECT quantity
  FROM   shopping_cart
  WHERE  cart_id = inCartId
         AND product_id = inProductId
         AND attributes = inAttributes
  INTO   productQuantity;

  -- Create new shopping cart record, or increase quantity of existing record
  IF productQuantity IS NULL THEN
    INSERT INTO shopping_cart(item_id, cart_id, product_id, attributes,
                              quantity, added_on)
           VALUES (UUID(), inCartId, inProductId, inAttributes, 1, NOW());
  ELSE
    UPDATE shopping_cart
    SET    quantity = quantity + 1, buy_now = true
    WHERE  cart_id = inCartId
           AND product_id = inProductId
           AND attributes = inAttributes;
  END IF;
END$$

-- Create shopping_cart_update_product stored procedure
CREATE PROCEDURE shopping_cart_update(IN inItemId INT, IN inQuantity INT)
BEGIN
  IF inQuantity > 0 THEN
    UPDATE shopping_cart
    SET    quantity = inQuantity, added_on = NOW()
    WHERE  item_id = inItemId;
  ELSE
    CALL shopping_cart_remove_product(inItemId);
  END IF;
END$$

-- Create shopping_cart_remove_product stored procedure
CREATE PROCEDURE shopping_cart_remove_product(IN inItemId VARCHAR(255))
BEGIN
  DELETE FROM shopping_cart WHERE item_id = inItemId;
END$$

-- Create shopping_cart_get_products stored procedure
CREATE PROCEDURE shopping_cart_get_products(IN inCartId CHAR(32))
BEGIN
  SELECT     sc.item_id, p.name, p.image, sc.attributes,
             COALESCE(NULLIF(p.discounted_price, 0), p.price) AS price,
             sc.quantity,
             COALESCE(NULLIF(p.discounted_price, 0),
                      p.price) * sc.quantity AS subtotal
  FROM       shopping_cart sc
  INNER JOIN product p
               ON sc.product_id = p.product_id
  WHERE      sc.cart_id = inCartId AND sc.buy_now;
END$$

-- Create shopping_cart_get_saved_products stored procedure
CREATE PROCEDURE shopping_cart_get_saved_products(IN inCartId CHAR(32))
BEGIN
  SELECT     sc.item_id, p.name, sc.attributes,
             COALESCE(NULLIF(p.discounted_price, 0), p.price) AS price
  FROM       shopping_cart sc
  INNER JOIN product p
               ON sc.product_id = p.product_id
  WHERE      sc.cart_id = inCartId AND NOT sc.buy_now;
END$$

-- Create shopping_cart_get_total_amount stored procedure
CREATE PROCEDURE shopping_cart_get_total_amount(IN inCartId CHAR(32))
BEGIN
  SELECT     SUM(COALESCE(NULLIF(p.discounted_price, 0), p.price)
                 * sc.quantity) AS total_amount
  FROM       shopping_cart sc
  INNER JOIN product p
               ON sc.product_id = p.product_id
  WHERE      sc.cart_id = inCartId AND sc.buy_now;
END$$

-- Create shopping_cart_save_product_for_later stored procedure
CREATE PROCEDURE shopping_cart_save_product_for_later(IN inItemId INT)
BEGIN
  UPDATE shopping_cart
  SET    buy_now = false, quantity = 1
  WHERE  item_id = inItemId;
END$$

-- Create shopping_cart_move_product_to_cart stored procedure
CREATE PROCEDURE shopping_cart_move_product_to_cart(IN inItemId INT)
BEGIN
  UPDATE shopping_cart
  SET    buy_now = true, added_on = NOW()
  WHERE  item_id = inItemId;
END$$

-- Create catalog_delete_product stored procedure
CREATE PROCEDURE catalog_delete_product(IN inProductId INT)
BEGIN
  DELETE FROM product_attribute WHERE product_id = inProductId;
  DELETE FROM product_category WHERE product_id = inProductId;
  DELETE FROM shopping_cart WHERE product_id = inProductId;
  DELETE FROM product WHERE product_id = inProductId;
END$$

-- Create shopping_cart_count_old_carts stored procedure
CREATE PROCEDURE shopping_cart_count_old_carts(IN inDays INT)
BEGIN
  SELECT COUNT(cart_id) AS old_shopping_carts_count
  FROM   (SELECT   cart_id
          FROM     shopping_cart
          GROUP BY cart_id
          HAVING   DATE_SUB(NOW(), INTERVAL inDays DAY) >= MAX(added_on))
         AS old_carts;
END$$

-- Create shopping_cart_delete_old_carts stored procedure
CREATE PROCEDURE shopping_cart_delete_old_carts(IN inDays INT)
BEGIN
  DELETE FROM shopping_cart
  WHERE  cart_id IN
          (SELECT cart_id
           FROM   (SELECT   cart_id
                   FROM     shopping_cart
                   GROUP BY cart_id
                   HAVING   DATE_SUB(NOW(), INTERVAL inDays DAY) >=
                            MAX(added_on))
                  AS sc);
END$$

-- Create shopping_cart_empty stored procedure
CREATE PROCEDURE shopping_cart_empty(IN inCartId CHAR(32))
BEGIN
  DELETE FROM shopping_cart WHERE cart_id = inCartId;
END$$

-- Create orders_get_order_details stored procedure
CREATE PROCEDURE orders_get_order_details(IN inOrderId INT)
BEGIN
  SELECT order_id, product_id, attributes, product_name,
         quantity, unit_cost, (quantity * unit_cost) AS subtotal
  FROM   order_detail
  WHERE  order_id = inOrderId;
END$$

-- Create catalog_get_recommendations stored procedure
CREATE PROCEDURE catalog_get_recommendations(
  IN inProductId INT, IN inShortProductDescriptionLength INT)
BEGIN
  PREPARE statement FROM
    "SELECT   od2.product_id, od2.product_name,
              IF(LENGTH(p.description) <= ?, p.description,
                 CONCAT(LEFT(p.description, ?), '...')) AS description
     FROM     order_detail od1
     JOIN     order_detail od2 ON od1.order_id = od2.order_id
     JOIN     product p ON od2.product_id = p.product_id
     WHERE    od1.product_id = ? AND
              od2.product_id != ?
     GROUP BY od2.product_id
     ORDER BY COUNT(od2.product_id) DESC
     LIMIT 5";

  SET @p1 = inShortProductDescriptionLength;
  SET @p2 = inProductId;

  EXECUTE statement USING @p1, @p1, @p2, @p2;
END$$

-- Create shopping_cart_get_recommendations stored procedure
CREATE PROCEDURE shopping_cart_get_recommendations(
  IN inCartId CHAR(32), IN inShortProductDescriptionLength INT)
BEGIN
  PREPARE statement FROM
    "-- Returns the products that exist in a list of orders
     SELECT   od1.product_id, od1.product_name,
              IF(LENGTH(p.description) <= ?, p.description,
                 CONCAT(LEFT(p.description, ?), '...')) AS description
     FROM     order_detail od1
     JOIN     order_detail od2
                ON od1.order_id = od2.order_id
     JOIN     product p
                ON od1.product_id = p.product_id
     JOIN     shopping_cart
                ON od2.product_id = shopping_cart.product_id
     WHERE    shopping_cart.cart_id = ?
              -- Must not include products that already exist
              -- in the visitor's cart
              AND od1.product_id NOT IN
              (-- Returns the products in the specified
               -- shopping cart
               SELECT product_id
               FROM   shopping_cart
               WHERE  cart_id = ?)
     -- Group the product_id so we can calculate the rank
     GROUP BY od1.product_id
     -- Order descending by rank
     ORDER BY COUNT(od1.product_id) DESC
     LIMIT    5";

  SET @p1 = inShortProductDescriptionLength;
  SET @p2 = inCartId;

  EXECUTE statement USING @p1, @p1, @p2, @p2;
END$$

-- Create customer_get_login_info stored procedure
CREATE PROCEDURE customer_get_login_info(IN inEmail VARCHAR(100))
BEGIN
  SELECT customer_id, password FROM customer WHERE email = inEmail;
END$$

-- Create customer_add stored procedure
CREATE PROCEDURE customer_add(IN inName VARCHAR(50),
  IN inEmail VARCHAR(100), IN inPassword VARCHAR(50))
BEGIN
  INSERT INTO customer (name, email, password)
         VALUES (inName, inEmail, inPassword);

  SELECT LAST_INSERT_ID();
END$$

-- Create customer_get_customer stored procedure
CREATE PROCEDURE customer_get_customer(IN inCustomerId INT)
BEGIN
  SELECT customer_id, name, email, password, credit_card,
         address_1, address_2, city, region, postal_code, country,
         shipping_region_id, day_phone, eve_phone, mob_phone
  FROM   customer
  WHERE  customer_id = inCustomerId;
END$$

-- Create customer_update_account stored procedure
CREATE PROCEDURE customer_update_account(IN inCustomerId INT,
  IN inName VARCHAR(50), IN inEmail VARCHAR(100),
  IN inPassword VARCHAR(50), IN inDayPhone VARCHAR(100),
  IN inEvePhone VARCHAR(100), IN inMobPhone VARCHAR(100))
BEGIN
  UPDATE customer
  SET    name = inName, email = inEmail,
         password = inPassword, day_phone = inDayPhone,
         eve_phone = inEvePhone, mob_phone = inMobPhone
  WHERE  customer_id = inCustomerId;
END$$

-- Create customer_update_credit_card stored procedure
CREATE PROCEDURE customer_update_credit_card(
  IN inCustomerId INT, IN inCreditCard TEXT)
BEGIN
  UPDATE customer
  SET    credit_card = inCreditCard
  WHERE  customer_id = inCustomerId;
END$$

-- Create customer_get_shipping_regions stored procedure
CREATE PROCEDURE customer_get_shipping_regions()
BEGIN
  SELECT shipping_region_id, shipping_region FROM shipping_region;
END$$

-- Create customer_update_address stored procedure
CREATE PROCEDURE customer_update_address(IN inCustomerId INT,
  IN inAddress1 VARCHAR(100), IN inAddress2 VARCHAR(100),
  IN inCity VARCHAR(100), IN inRegion VARCHAR(100),
  IN inPostalCode VARCHAR(100), IN inCountry VARCHAR(100),
  IN inShippingRegionId INT)
BEGIN
  UPDATE customer
  SET    address_1 = inAddress1, address_2 = inAddress2, city = inCity,
         region = inRegion, postal_code = inPostalCode,
         country = inCountry, shipping_region_id = inShippingRegionId
  WHERE  customer_id = inCustomerId;
END$$

-- Create orders_get_most_recent_orders stored procedure
CREATE PROCEDURE orders_get_most_recent_orders(IN inHowMany INT)
BEGIN
  PREPARE statement FROM
    "SELECT     o.order_id, o.total_amount, o.created_on,
                o.shipped_on, o.status, c.name
     FROM       orders o
     INNER JOIN customer c
                  ON o.customer_id = c.customer_id
     ORDER BY   o.created_on DESC
     LIMIT      ?";

  SET @p1 = inHowMany;

  EXECUTE statement USING @p1;
END$$

-- Create orders_get_orders_between_dates stored procedure
CREATE PROCEDURE orders_get_orders_between_dates(
  IN inStartDate DATETIME, IN inEndDate DATETIME)
BEGIN
  SELECT     o.order_id, o.total_amount, o.created_on,
             o.shipped_on, o.status, c.name
  FROM       orders o
  INNER JOIN customer c
               ON o.customer_id = c.customer_id
  WHERE      o.created_on >= inStartDate AND o.created_on <= inEndDate
  ORDER BY   o.created_on DESC;
END$$

-- Create orders_get_orders_by_status stored procedure
CREATE PROCEDURE orders_get_orders_by_status(IN inStatus INT)
BEGIN
  SELECT     o.order_id, o.total_amount, o.created_on,
             o.shipped_on, o.status, c.name
  FROM       orders o
  INNER JOIN customer c
               ON o.customer_id = c.customer_id
  WHERE      o.status = inStatus
  ORDER BY   o.created_on DESC;
END$$

-- Create orders_get_by_customer_id stored procedure
CREATE PROCEDURE orders_get_by_customer_id(IN inCustomerId INT)
BEGIN
  SELECT     o.order_id, o.total_amount, o.created_on,
             o.shipped_on, o.status, c.name
  FROM       orders o
  INNER JOIN customer c
               ON o.customer_id = c.customer_id
  WHERE      o.customer_id = inCustomerId
  ORDER BY   o.created_on DESC;
END$$

-- Create orders_get_order_short_details stored procedure
CREATE PROCEDURE orders_get_order_short_details(IN inOrderId INT)
BEGIN
  SELECT      o.order_id, o.total_amount, o.created_on,
              o.shipped_on, o.status, c.name
  FROM        orders o
  INNER JOIN  customer c
                ON o.customer_id = c.customer_id
  WHERE       o.order_id = inOrderId;
END$$

-- Create customer_get_customers_list stored procedure
CREATE PROCEDURE customer_get_customers_list()
BEGIN
  SELECT customer_id, name FROM customer ORDER BY name ASC;
END$$

-- Create shopping_cart_create_order stored procedure
CREATE PROCEDURE shopping_cart_create_order(IN inCartId CHAR(32),
  IN inCustomerId INT, IN inShippingId INT, IN inTaxId INT)
BEGIN
  DECLARE orderId INT;

  -- Insert a new record into orders and obtain the new order ID
  INSERT INTO orders (created_on, customer_id, shipping_id, tax_id) VALUES
         (NOW(), inCustomerId, inShippingId, inTaxId);
  -- Obtain the new Order ID
  SELECT LAST_INSERT_ID() INTO orderId;

  -- Insert order details in order_detail table
  INSERT INTO order_detail (order_id, product_id, attributes,
                            product_name, quantity, unit_cost)
  SELECT      orderId, p.product_id, sc.attributes, p.name, sc.quantity,
              COALESCE(NULLIF(p.discounted_price, 0), p.price) AS unit_cost
  FROM        shopping_cart sc
  INNER JOIN  product p
                ON sc.product_id = p.product_id
  WHERE       sc.cart_id = inCartId AND sc.buy_now;

  -- Save the order's total amount
  UPDATE orders
  SET    total_amount = (SELECT SUM(unit_cost * quantity) 
                         FROM   order_detail
                         WHERE  order_id = orderId)
  WHERE  order_id = orderId;

  -- Clear the shopping cart
  CALL shopping_cart_empty(inCartId);

  -- Return the Order ID
  SELECT orderId;
END$$

-- Create orders_get_order_info stored procedure
CREATE PROCEDURE orders_get_order_info(IN inOrderId INT)
BEGIN
  SELECT     o.order_id, o.total_amount, o.created_on, o.shipped_on,
             o.status, o.comments, o.customer_id, o.auth_code,
             o.reference, o.shipping_id, s.shipping_type, s.shipping_cost,
             o.tax_id, t.tax_type, t.tax_percentage
  FROM       orders o
  INNER JOIN tax t
               ON t.tax_id = o.tax_id
  INNER JOIN shipping s
               ON s.shipping_id = o.shipping_id
  WHERE      o.order_id = inOrderId;
END$$

-- Create orders_get_shipping_info stored procedure
CREATE PROCEDURE orders_get_shipping_info(IN inShippingRegionId INT)
BEGIN
  SELECT shipping_id, shipping_type, shipping_cost, shipping_region_id
  FROM   shipping
  WHERE  shipping_region_id = inShippingRegionId;
END$$

-- Create orders_create_audit stored procedure
CREATE PROCEDURE orders_create_audit(IN inOrderId INT,
  IN inMessage TEXT, IN inCode INT)
BEGIN
  INSERT INTO audit (order_id, created_on, message, code)
         VALUES (inOrderId, NOW(), inMessage, inCode);
END$$

-- Create orders_update_status stored procedure
CREATE PROCEDURE orders_update_status(IN inOrderId INT, IN inStatus INT)
BEGIN
  UPDATE orders SET status = inStatus WHERE order_id = inOrderId;
END$$

-- Create orders_set_auth_code stored procedure
CREATE PROCEDURE orders_set_auth_code(IN inOrderId INT,
  IN inAuthCode VARCHAR(50), IN inReference VARCHAR(50))
BEGIN
  UPDATE orders
  SET    auth_code = inAuthCode, reference = inReference
  WHERE  order_id = inOrderId;
END$$

-- Create orders_set_date_shipped stored procedure
CREATE PROCEDURE orders_set_date_shipped(IN inOrderId INT)
BEGIN
  UPDATE orders SET shipped_on = NOW() WHERE order_id = inOrderId;
END$$

-- Create orders_update_order stored procedure
CREATE PROCEDURE orders_update_order(IN inOrderId INT, IN inStatus INT,
  IN inComments VARCHAR(255), IN inAuthCode VARCHAR(50),
  IN inReference VARCHAR(50))
BEGIN
  DECLARE currentDateShipped DATETIME;

  SELECT shipped_on
  FROM   orders
  WHERE  order_id = inOrderId
  INTO   currentDateShipped;

  UPDATE orders
  SET    status = inStatus, comments = inComments,
         auth_code = inAuthCode, reference = inReference
  WHERE  order_id = inOrderId;

  IF inStatus < 7 AND currentDateShipped IS NOT NULL THEN
    UPDATE orders SET shipped_on = NULL WHERE order_id = inOrderId;
  ELSEIF inStatus > 6 AND currentDateShipped IS NULL THEN
    UPDATE orders SET shipped_on = NOW() WHERE order_id = inOrderId;
  END IF;
END$$

-- Create orders_get_audit_trail stored procedure
CREATE PROCEDURE orders_get_audit_trail(IN inOrderId INT)
BEGIN
  SELECT audit_id, order_id, created_on, message, code
  FROM   audit
  WHERE  order_id = inOrderId;
END$$

-- Create catalog_get_product_reviews stored procedure
CREATE PROCEDURE catalog_get_product_reviews(IN inProductId INT)
BEGIN
  SELECT     c.name, r.review, r.rating, r.created_on
  FROM       review r
  INNER JOIN customer c
               ON c.customer_id = r.customer_id
  WHERE      r.product_id = inProductId
  ORDER BY   r.created_on DESC;
END$$

-- Create catalog_create_product_review stored procedure
CREATE PROCEDURE catalog_create_product_review(IN inCustomerId INT,
  IN inProductId INT, IN inReview TEXT, IN inRating SMALLINT)
BEGIN
  INSERT INTO review (customer_id, product_id, review, rating, created_on)
         VALUES (inCustomerId, inProductId, inReview, inRating, NOW());
END$$

-- Change back DELIMITER to ;
DELIMITER ;
