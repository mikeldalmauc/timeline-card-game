export interface TimelineCard {
  id: string;
  title: string;
  desc: string;
  dateRaw: number;
  dateLabel: string;
  summary: string;
  imgUrl: string;
}

export const CARDS: TimelineCard[] = [
  { id: "a7f3e9c2b1d4f6a8", title: "Cueva de Santimamiñe", desc: "Pinturas rupestres de grupos de cazadores-recolectores en Bizkaia.", dateRaw: -13000, dateLabel: "13.000 a.C.", summary: "Arte rupestre paleolítico.", imgUrl: "/santima.jpg" },
  { id: "b2e8c5f1a9d3g7h4", title: "Fundación de Pompaelo", desc: "El general romano Pompeyo funda la actual Pamplona.", dateRaw: -74, dateLabel: "74 a.C.", summary: "Presencia romana en territorio vascón.", imgUrl: "/pompaelo.png" },
  { id: "c9a1f4d6e2b8h3i5", title: "Conquista Musulmana", desc: "Las tropas musulmanas cruzan el estrecho de Gibraltar e inician la conquista de la península.", dateRaw: 711, dateLabel: "711", summary: "Inicio de Al-Ándalus.", imgUrl: "/conquistamusulmana.png" },
  { id: "d4b7e3f9c1a6i2j8", title: "Batalla de Roncesvalles", desc: "Los vascones derrotan a la retaguardia del ejército de Carlomagno.", dateRaw: 778, dateLabel: "778", summary: "Muerte de Roldán en los Pirineos.", imgUrl: "/roncesvalles.png" },
  { id: "e6c2a8f5d9b3j1k4", title: "Reino de Pamplona", desc: "Íñigo Arista se convierte en el primer rey de Pamplona.", dateRaw: 824, dateLabel: "824", summary: "Origen del Reino de Navarra.", imgUrl: "/inigoarista.png" },
  { id: "f1d9c3e7a5b2k6l9", title: "Fundación de Bilbao", desc: "Don Diego López de Haro otorga la Carta Puebla a Bilbao.", dateRaw: 1300, dateLabel: "1300", summary: "Nacimiento de la Villa de Bilbao.", imgUrl: "/fundacionbilbao.png" },
  { id: "g8e4f2a1c6d3l5m7", title: "Descubrimiento de América", desc: "Cristóbal Colón llega a América financiado por los Reyes Católicos.", dateRaw: 1492, dateLabel: "1492", summary: "Llegada al Nuevo Mundo.", imgUrl: "/americadescubrimiento.png" },
  { id: "h3f6d1b9a8e2m4n6", title: "Conquista de Navarra", desc: "Las tropas castellanas al mando del Duque de Alba invaden el Reino de Navarra.", dateRaw: 1512, dateLabel: "1512", summary: "Incorporación de Navarra a Castilla.", imgUrl: "/conquistanavarra.png" },
  { id: "i5a7c2f8d3b1n9o2", title: "Primera Vuelta al Mundo", desc: "El marino vasco Juan Sebastián Elcano completa la primera circunnavegación de la Tierra.", dateRaw: 1522, dateLabel: "1522", summary: "Expedición Magallanes-Elcano.", imgUrl: "/primeravueltaalmundo.png" },
  { id: "j2b4e9a6f1c7o3p5", title: "Linguae Vasconum Primitiae", desc: "Bernat Etxepare publica el primer libro impreso en euskera.", dateRaw: 1545, dateLabel: "1545", summary: "Primer libro en euskera.", imgUrl: "/liguaevasconum.png" },
  { id: "k7f3d5a2c8b6p1q9", title: "Guerra de Sucesión", desc: "Comienza el conflicto europeo tras la muerte sin descendencia de Carlos II de España.", dateRaw: 1701, dateLabel: "1701", summary: "Guerra y cambio de dinastía a los Borbones.", imgUrl: "/guerrasucesion.png" },
  { id: "l4c1f7e3d9a2q8r6", title: "Guerra de la Independencia", desc: "Alzamiento contra la ocupación francesa y las tropas de Napoleón en España.", dateRaw: 1808, dateLabel: "1808", summary: "Levantamiento del 2 de mayo.", imgUrl: "/guerraindependecia.png" },
  { id: "m9a5c2b8f3d1r4s7", title: "Primera Guerra Carlista", desc: "Conflicto civil en España entre partidarios de Isabel II y los tradicionalistas carlistas.", dateRaw: 1833, dateLabel: "1833", summary: "Inicio de las Guerras Carlistas.", imgUrl: "/primeraguerracarlista.png" },
  { id: "n6d3f1a7c9b5s2t8", title: "Abolición de los Fueros Vascos", desc: "Fin del sistema foral vasco tradicional tras la Tercera Guerra Carlista.", dateRaw: 1876, dateLabel: "1876", summary: "Ley abolitoria de 1876.", imgUrl: "/fuerosabolicion.png" },
  { id: "o1e8a4f6d2c3t9u4", title: "Fundación del PNV", desc: "Sabino Arana funda el Partido Nacionalista Vasco (EAJ-PNV).", dateRaw: 1895, dateLabel: "1895", summary: "Nacimiento del nacionalismo vasco institucional.", imgUrl: "/fundacionpnv.png" },
  { id: "p3b9c5e1f8a6u7v2", title: "Desastre del 98", desc: "España pierde sus últimas colonias en América y Asia.", dateRaw: 1898, dateLabel: "1898", summary: "Fin del Imperio español.", imgUrl: "/desastre98.png" },
  { id: "q8f2d7a3c1b9v5w1", title: "Primera Guerra Mundial", desc: "España se declara neutral, provocando un gran auge en la industria vasca.", dateRaw: 1914, dateLabel: "1914", summary: "Boom económico en la cornisa cantábrica.", imgUrl: "/primeraguerramundial.png" },
  { id: "r5a9c4e2f7d1w3x8", title: "Creación de Euskaltzaindia", desc: "Fundación de la Real Academia de la Lengua Vasca por las cuatro diputaciones vasco-navarras.", dateRaw: 1918, dateLabel: "1918", summary: "Guardián del euskera.", imgUrl: "/creacioneuskaltzaindia.png" },
  { id: "s2c7f4a9b1e6x8y3", title: "Segunda República", desc: "Proclamación de la Segunda República Española y exilio del rey Alfonso XIII.", dateRaw: 1931, dateLabel: "1931", summary: "Periodo republicano y reformas.", imgUrl: "/segundarepublica.png" },
  { id: "t4d1a8c6f3b2y9z5", title: "Guerra Civil Española", desc: "Insurrección militar contra la República que desemboca en un sangriento conflicto de 3 años.", dateRaw: 1936, dateLabel: "1936", summary: "Inicio de la Guerra Civil.", imgUrl: "/guerracivil.png" },
  { id: "u7e3b2f9a5c8z1a4", title: "Bombardeo de Gernika", desc: "La Legión Cóndor alemana y la Aviación Legionaria italiana bombardean y arrasan la villa foral.", dateRaw: 1937, dateLabel: "1937", summary: "Ataque indiscriminado a civiles en Gernika.", imgUrl: "/bombardeogernika.png" },
  { id: "v1f6c3a9d7b5a2e8", title: "Fin de la Guerra Civil", desc: "Los nacionales declaran la victoria y comienza la dictadura de Francisco Franco.", dateRaw: 1939, dateLabel: "1939", summary: "Inicio del franquismo.", imgUrl: "/finguerracivil.png" },
  { id: "w9a2f4e1c7d3b6f5", title: "Transición Española", desc: "Muerte de Franco e inicio de la transición a la democracia y proclamación de Juan Carlos I.", dateRaw: 1975, dateLabel: "1975", summary: "Restauración de la monarquía y democracia.", imgUrl: "/transicion.png" },
  { id: "x3d8b1a5f2c9e7g4", title: "Constitución Española", desc: "Aprobación en referéndum de la Constitución que establece el actual marco jurídico español.", dateRaw: 1978, dateLabel: "1978", summary: "La Carta Magna de 1978.", imgUrl: "/constitucionespanola.png" },
  { id: "y6c4e2f9a1d7b3h8", title: "Estatuto de Gernika", desc: "Aprobación del Estatuto de Autonomía del País Vasco.", dateRaw: 1979, dateLabel: "1979", summary: "Autonomía vasca actual.", imgUrl: "/estatutogernika.png" },
  { id: "z2a7d1c5f8b3e6i9", title: "Primera Korrika", desc: "AEK organiza la primera marcha multitudinaria en favor del euskera.", dateRaw: 1980, dateLabel: "1980", summary: "Carrera por el euskera de Oñati a Bilbao.", imgUrl: "/primerakorrika.png" },
  { id: "aa5f3b9c1e7d2a6", title: "Ingreso en la CEE", desc: "España firma su adhesión a las Comunidades Europeas (actual Unión Europea).", dateRaw: 1986, dateLabel: "1986", summary: "España entra en Europa.", imgUrl: "/ingresocee.png" },
  { id: "ab8c1f6a3d9e2b7", title: "Museo Guggenheim Bilbao", desc: "Inauguración del emblemático museo diseñado por Frank Gehry que transforma Bilbao.", dateRaw: 1997, dateLabel: "1997", summary: "El Efecto Bilbao.", imgUrl: "/guggenheim.png" },
  { id: "ac4d7a2f5c1b8e3", title: "Fin de la lucha armada de ETA", desc: "La organización armada ETA anuncia el cese definitivo de su actividad armada.", dateRaw: 2011, dateLabel: "2011", summary: "Paz tras décadas de violencia.", imgUrl: "/finterrorismoeta.png" },
  { id: "ad9e2c6b1f3a8d5", title: "Disolución de ETA", desc: "ETA anuncia su disolución final, concluyendo su trayectoria organizativa.", dateRaw: 2018, dateLabel: "2018", summary: "Desaparición de la organización.", imgUrl: "/etadisolucion.png" }
];
