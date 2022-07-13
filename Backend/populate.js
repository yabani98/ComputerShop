"use strict";
require("dotenv").config();
const Component = require("./models/component");
const Category = require("./models/category");
const fs = require("fs");
const mongoose = require("mongoose");

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const create_category = async (name, description) => {
  const doc = new Category({
    name,
    description,
  });
  await doc.save();
  return doc;
};

const create_component = async (
  name,
  description,
  manufacturer,
  category,
  price,
  stock,
  image_path
) => {
  const doc = new Component({
    name,
    description,
    manufacturer,
    category: category._id,
    price,
    stock,
    image: {
      data: fs.readFileSync(image_path),
      contentType: "image/jpg",
    },
  });
  await doc.save();
};
(async () => {
 console.log('start');
  const videoCard = await create_category(
    "VideoCard",
    `The video card is an expansion card that allows the computer to send graphical information to a video display device such as a monitor, TV, or projector.`
  );
const videoCardComponent1 = await create_component(`MSI Gaming GeForce RTX 3060 Ti LHR`,`Chipset: NVIDIA GeForce RTX 3060 Ti LHR:
Boost Clock: 1695 MHz:
Video Memory: 10GB GDDR6X:
Memory Interface: 256-bit:
Output: DisplayPort x 3 (v1.4a) / HDMI 2.1 x 1`,'MSI',videoCard,15000,20,__dirname+'/images/vc1.jpg');

const videoCardComponent2 = await create_component(`GIGABYTE GeForce GTX 1650`,`Powered by GeForce GTX 1650:
NVIDIA Turing architecture and GeForce Experience:
Integrated with 4GB GDDR6 128bit memory interface:
80mm unique blade fan:
170 mm compact card size`,'NVIDIA',videoCard,6000,15,__dirname+'/images/vc2.jpg');
console.log('finished video card');
const cpu = await create_category('CPU','The CPU is the brain of a computer, containing all the circuitry needed to process input, store data, and output results.');
const cpuComponent1 = await create_component('Intel Core i7-12700KF Desktop Processor 12',`Intel® Core® i7 3.60 GHz processor offers more cache space and the hyper-threading architecture delivers high performance for demanding applications with better onboard graphics and faster turbo boost:
The Socket LGA-1700 socket allows processor to be placed on the PCB without soldering:
11 MB L2 and 25 MB L3 cache offers supreme performance for computation intensive apps:
Intel 7 Architecture enables improved performance per watt and micro architecture makes it power-efficient`,'Intel',cpu,7600,25,__dirname+'/images/cpu1.jpg');
const cpuComponent2 = await create_component('AMD Ryzen 7 5800X 8-core',`AMD's fastest 8 core processor for mainstream desktop, with 16 procesing threads. OS Support-Windows 10 64-Bit Edition:
Can deliver elite 100-plus FPS performance in the world's most popular games:
Cooler not included, high-performance cooler recommended:
4.7 GHz Max Boost, unlocked for overclocking, 36 MB of cache, DDR-3200 support:
For the advanced Socket AM4 platform, can support PCIe 4.0 on X570 and B550 motherboards`,'AMD',cpu,6500,10,__dirname+'/images/cpu2.jpg');
console.log('finished cpu');
const mb = await create_category('MotherBoard',`The motherboard is a printed circuit board and foundation of a computer that is the biggest board in a computer chassis. It allocates power and allows communication to and between the CPU, RAM, and all other computer hardware components.`);
const mbcomponent1 = await create_component('ASUS ROG Strix B450-F Gaming II AMD AM4',`AMD AM4 Socket: Compatible to Ryzen 5000, 3rd/2nd/1st Gen AMD Ryzen CPUs:
Robust Power Design: 8+2 DrMOS power stages with high-quality alloy chokes and durable capacitors provide reliable power for the last AMD high-count-core CPUs:
Optimized Thermal Solution: Extended VRM and PCH heatsinks, M.2 heatsinks, multiple hybrid fan headers and fan speed management with Fan Xpert utility:
Best Gaming Connectivity: Supports HDMI 2.0b(4K@60HZ) and DisplayPort 1.2 output, featuring dual M.2 slots (NVMe SSD), 2x PCIe 3.0x16 Slot, USB 3.2 Gen 2 Type-A port and USB 3.1 Gen 2 Type-A & Type-C ports:
Industry-leading Gaming Audio & AI Noise Canceling Microphone Technology: High fidelity audio from a SupremeFX S1220A codec with DTS Sound Unbound and Sonic Studio III draws you deeper into the action. Communicate clearly with ASUS AI Noise Cancelling Mic technology.:
Unmatched Personalization: ASUS-exclusive Aura Sync RGB lighting with Armoury Crate utility, including 2xRGB headers and a Gen 2 addressable RGB header for greater customization:
DIY Friendly: With BIOS Flashback and ASUS exclusive UEFI BIOS, 256Mb BIOS Flash ROM and Pre-mount I/O shroud:
Please ensure your BIOS is up to date if installing a compatible Ryzen 5000 series CPU. Visit ASUS site search by motherboard model name, click on “Support” tab, Drivers and Tools, then BIOS & Firmware to download the latest BIOS.`,'ASUS',mb,2900,5,__dirname+'/images/mb1.jpg');
const mbcomponent2 = await create_component('MSI MAG X570S Tomahawk WiFi Motherboard',`Supports AMD Ryzen 5000 Series, 5000 G-Series, 4000 G-Series, 3000 Series, 3000 G-Series, 2000 Series and 2000 G-Series desktop processors:
Supports DDR4 Memory, up to 5100(OC) MHz:
Premium Thermal Solution: Extended Heatsink Design and M.2 Shield Frozr are built for high performance system and non-stop works:
2.5G LAN and Intel Wi-Fi 6E Solution: Upgraded network solution for professional and multimedia use. Delivers a secure, stable and fast network connection:
Lightning M.2: Running at PCIe Gen4 x4 maximizes performance for NVMe based SSDs`,'MSI',mb,4900,6,__dirname+'/images/mb2.jpg');

console.log('finished mb');



console.log('finished');
process.exit(0);
})();
