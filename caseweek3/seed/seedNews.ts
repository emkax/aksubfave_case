import { prisma } from "../src/config/prisma.instantiate.js";
async function main() {
    const seeds = [
    {
        judul: "Perkembangan Teknologi AI di Tahun 2026",
        konten: "Kecerdasan buatan terus berkembang pesat di berbagai industri dan membantu meningkatkan otomatisasi serta pengambilan keputusan.",
        penulis: "Ricardo",
        thumbnail: "../../media/ai-tech.jpg",
        published: true
    },
    {
        judul: "Hasil KTT Iklim Global",
        konten: "Para pemimpin dunia berkumpul untuk membahas strategi baru dalam menghadapi perubahan iklim dan pembangunan berkelanjutan.",
        penulis: "Darryl",
        thumbnail: "../../media/climate.jpg",
        published: true
    },
    {
        judul: "Peluncuran Kendaraan Listrik Terbaru",
        konten: "Perusahaan otomotif besar memperkenalkan model kendaraan listrik terbaru dengan performa baterai yang lebih baik.",
        penulis: "Delly",
        thumbnail: "../../media/ev.jpg",
        published: false
    },
    {
        judul: "Terobosan Baru dalam Penelitian Medis",
        konten: "Para ilmuwan mengumumkan penemuan yang menjanjikan untuk pengembangan metode pengobatan yang lebih efektif.",
        penulis: "Kevin",
        thumbnail: "../../media/medical.jpg",
        published: true
    },
    {
        judul: "Ekosistem Startup Semakin Berkembang",
        konten: "Pertumbuhan startup semakin pesat seiring meningkatnya investasi modal ventura di berbagai sektor teknologi.",
        penulis: "Dengklek",
        thumbnail: "../../media/startup.jpg",
        published: false
    }
  ];

  for (const news of seeds) {
    const result = await prisma.news.upsert({
      where: { judul: news.judul },
      update: news,
      create: news
    });

    console.log(result);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });