import React, { useEffect, useState } from "react";
import {
  alertCircleOutline,
  time,
  closeCircleOutline,
  refresh,
  playCircleOutline,
  informationCircleOutline,
  pauseCircleOutline,
  homeOutline,
  exitOutline,
  helpCircleOutline,
} from "ionicons/icons";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";
import "./Acertijos.css";
import {
  IonCard,
  IonContent,
  IonIcon,
  IonPage,
  IonPopover,
  IonTitle,
  IonButton,
  IonBadge,
  IonChip,
} from "@ionic/react";

type NivelFlujoId = "basico" | "intermedio" | "avanzado";

type ProblematicaFlujoId =
  | "fotosintesis"
  | "respiracion"
  | "autotrofos"
  | "reproduccion"
  | "fototropismo"
  | "edad"
  | "fraccion"
  | "canicas"
  | "cifras"
  | "multiplo"
  | "cerebro"
  | "pulmones"
  | "estomago"
  | "rinones"
  | "higado"
  | "intestino"
  | "musculo"
  | "ojo"
  | "cuadrado"
  | "rombo"
  | "pentagono"
  | "hexagono"
  | "octagono"
  | "circulo"
  | "semicirculo"
  | "trapecio"
  | "viral"
  | "dtp"
  | "polio"
  | "tetanos"
  | "hepatitis"
  | "paperas"
  | "rotavirus"
  | "bcg"
  | "influenza"
  | "varicela"
  | "prismaRectangular"
  | "cubo"
  | "prisma"
  | "piramide"
  | "esfera"
  | "cilindro"
  | "cono"
  | "tetraedro"
  | "octaedro"
  | "dodecaedro";

interface RespuestaOpcion {
  texto: string;
  esCorrecta: boolean;
}

interface EscenarioFlujo {
  id: ProblematicaFlujoId;
  titulo: string;
  acertijo: string;
  respuestas: RespuestaOpcion[];
}

type DiccionarioFlujo = Record<NivelFlujoId, EscenarioFlujo[]>;

const diccionarioFlujo: DiccionarioFlujo = {
  basico: [
    {
      id: "fotosintesis",
      titulo: "Fotosíntesis en plantas",
      acertijo:
        "No me alimento como tú ni como un animal; con luz, agua y aire fabrico mi pan. ¿Qué proceso realizo?",
      respuestas: [
        {
          texto: "Fotosíntesis",
          esCorrecta: true,
        },
        {
          texto: "Respiración",
          esCorrecta: false,
        },
        {
          texto: "Reproducción",
          esCorrecta: false,
        },
      ],
    },
    {
      id: "respiracion",
      titulo: "Respiración en plantas",
      acertijo:
        "No tengo pulmones como tú, pero día y noche respiro. Tomo aire por mis poros y en silencio sigo vivo. ¿Qué proceso realizo?",
      respuestas: [
        {
          texto: "Digestión",
          esCorrecta: false,
        },
        {
          texto: "Respiración",
          esCorrecta: true,
        },
        {
          texto: "Excreción",
          esCorrecta: false,
        },
      ],
    },
    {
      id: "autotrofos",
      titulo: "Seres autótrofos",
      acertijo:
        "No necesito pedir comida ni pedir comida para llevar. Yo mismo me la preparo, ¿cómo me puedo llamar?",
      respuestas: [
        { texto: "Autótrofo", esCorrecta: true },
        {
          texto: "Heterótrofo",
          esCorrecta: false,
        },
        {
          texto: "Trofólogo",
          esCorrecta: false,
        },
      ],
    },
    {
      id: "reproduccion",
      titulo: "Reproducción en plantas",
      acertijo:
        "De una semillita salgo yo, y luego hago miles más. Soy un proceso que hace copias para que la vida continúe sin parar. ¿Quién soy?",
      respuestas: [
        {
          texto: "Nutrición",
          esCorrecta: false,
        },
        {
          texto: "Reproducción",
          esCorrecta: true,
        },
        {
          texto: "Deporte vegetal",
          esCorrecta: false,
        },
      ],
    },
    {
      id: "fototropismo",
      titulo: "Fototropismo",
      acertijo:
        "Aunque no tengo pies ni ruedas, me muevo sin caminar. Si la luz aparece, hacia ella me verás girar. ¿Qué soy?",
      respuestas: [
        {
          texto: "Fototropismo",
          esCorrecta: true,
        },
        {
          texto: "Hibernación",
          esCorrecta: false,
        },
        {
          texto: "Fotosíntesis",
          esCorrecta: false,
        },
      ],
    },
    {
      id: "edad",
      titulo: "Edad de Ana",
      acertijo:
        "Ana tiene el doble de años que Luis. Si entre los dos suman 18 años, ¿cuántos años tiene Ana?",
      respuestas: [
        { texto: "6", esCorrecta: false },
        { texto: "12", esCorrecta: true },
        { texto: "9", esCorrecta: false },
      ],
    },
    {
      id: "fraccion",
      titulo: "Fracción de pizza",
      acertijo:
        "Tenías 3/4 de una pizza. Te comes la mitad de lo que tenías. ¿Qué fracción de la pizza comiste?",
      respuestas: [
        { texto: "3/8", esCorrecta: true },
        { texto: "1/4", esCorrecta: false },
        { texto: "1/2", esCorrecta: false },
      ],
    },
    {
      id: "canicas",
      titulo: "Canicas de B",
      acertijo:
        "A, B y C tienen canicas. A tiene el doble que B, y C tiene 5 menos que A. Si entre los tres suman 30 canicas, ¿cuántas tiene B?",
      respuestas: [
        { texto: "5", esCorrecta: false },
        { texto: "7", esCorrecta: true },
        { texto: "10", esCorrecta: false },
      ],
    },
    {
      id: "cifras",
      titulo: "Número de dos cifras",
      acertijo:
        "Soy un número de dos cifras. La cifra de las decenas es 3 veces la cifra de las unidades, y la suma de mis cifras es 12. ¿Quién soy?",
      respuestas: [
        { texto: "39", esCorrecta: false },
        { texto: "84", esCorrecta: false },
        { texto: "93", esCorrecta: true },
      ],
    },
    {
      id: "multiplo",
      titulo: "Múltiplo de 5 y 7",
      acertijo:
        "¿Cuál es el número más pequeño mayor que 100 que es divisible tanto por 5 como por 7?",
      respuestas: [
        { texto: "105", esCorrecta: true },
        { texto: "110", esCorrecta: false },
        { texto: "140", esCorrecta: false },
      ],
    },
  ],

  intermedio: [
    {
      id: "cerebro",
      titulo: "Cerebro",
      acertijo:
        "Sin mí no puedes pensar, soñar ni recordar. Coordino lo que haces sin descansar. ¿Quién soy?",
      respuestas: [
        { texto: "Corazón", esCorrecta: false },
        { texto: "Cerebro", esCorrecta: true },
        { texto: "Estómago", esCorrecta: false },
      ],
    },
    {
      id: "pulmones",
      titulo: "Pulmones",
      acertijo:
        "Me inflo y me desinflo sin parar, gracias a mí puedes saltar, hablar y respirar. ¿Quién soy?",
      respuestas: [
        { texto: "Pulmones", esCorrecta: true },
        { texto: "Hígado", esCorrecta: false },
        { texto: "Riñones", esCorrecta: false },
      ],
    },
    {
      id: "estomago",
      titulo: "Estómago",
      acertijo:
        "Soy un saco que nunca cocina, pero con jugos y ácidos la comida tritura. ¿Quién soy?",
      respuestas: [
        { texto: "Estómago", esCorrecta: true },
        { texto: "Intestino", esCorrecta: false },
        { texto: "Páncreas", esCorrecta: false },
      ],
    },
    {
      id: "rinones",
      titulo: "Riñones",
      acertijo:
        "Somos dos y trabajamos en silencio, limpiamos la sangre y expulsamos lo que no tiene uso. ¿Quiénes somos?",
      respuestas: [
        { texto: "Pulmones", esCorrecta: false },
        { texto: "Riñones", esCorrecta: true },
        { texto: "Corazón", esCorrecta: false },
      ],
    },
    {
      id: "higado",
      titulo: "Hígado",
      acertijo:
        "Transformo lo que comes, limpio tu sangre y te ayudo a digerir. Sin mí, te costaría mucho vivir. ¿Quién soy?",
      respuestas: [
        { texto: "Páncreas", esCorrecta: false },
        { texto: "Hígado", esCorrecta: true },
        { texto: "Estómago", esCorrecta: false },
      ],
    },
    {
      id: "intestino",
      titulo: "Intestino delgado",
      acertijo:
        "Soy largo, delgado y estoy en tu barriga. De lo que comes, tomo lo bueno y lo envío a la sangre enseguida. ¿Quién soy?",
      respuestas: [
        { texto: "Intestino grueso", esCorrecta: false },
        { texto: "Intestino delgado", esCorrecta: true },
        { texto: "Páncreas", esCorrecta: false },
      ],
    },
    {
      id: "musculo",
      titulo: "Músculo",
      acertijo:
        "Gracias a mí puedes brincar, correr y abrazar. Me estiro y me encojo para poder moverte sin parar. ¿Quién soy?",
      respuestas: [
        { texto: "Músculo", esCorrecta: true },
        { texto: "Hueso", esCorrecta: false },
        { texto: "Cerebro", esCorrecta: false },
      ],
    },
    {
      id: "ojo",
      titulo: "Ojo",
      acertijo:
        "Abro y cierro mis cortinas cada día, y con mi ayuda ves colores, formas y alegría. ¿Quién soy?",
      respuestas: [
        { texto: "Oído", esCorrecta: false },
        { texto: "Ojo", esCorrecta: true },
        { texto: "Nariz", esCorrecta: false },
      ],
    },

    {
      id: "cuadrado",
      titulo: "Cuadrado",
      acertijo:
        "Todos mis lados son iguales, y mis ángulos son perfectos y rectales. ¿Quién soy?",
      respuestas: [
        { texto: "Cuadrado", esCorrecta: true },
        { texto: "Rectángulo", esCorrecta: false },
        { texto: "Rombo", esCorrecta: false },
      ],
    },
    {
      id: "rombo",
      titulo: "Rombo",
      acertijo:
        "Parezco un cuadrado girado, todos mis lados son iguales, pero mis ángulos algo inclinados. ¿Quién soy?",
      respuestas: [
        { texto: "Trapecio", esCorrecta: false },
        { texto: "Rombo", esCorrecta: true },
        { texto: "Hexágono", esCorrecta: false },
      ],
    },
    {
      id: "pentagono",
      titulo: "Pentágono",
      acertijo:
        "Si dibujas una estrella, seguro me ves, porque soy el polígono con cinco pies. ¿Quién soy?",
      respuestas: [
        { texto: "Pentágono", esCorrecta: true },
        { texto: "Hexágono", esCorrecta: false },
        { texto: "Heptágono", esCorrecta: false },
      ],
    },
    {
      id: "hexagono",
      titulo: "Hexágono",
      acertijo:
        "Las abejas me usan para construir su hogar, tengo seis lados iguales, ¡me encanta trabajar! ¿Quién soy?",
      respuestas: [
        { texto: "Hexágono", esCorrecta: true },
        { texto: "Octágono", esCorrecta: false },
        { texto: "Heptágono", esCorrecta: false },
      ],
    },
    {
      id: "octagono",
      titulo: "Octágono",
      acertijo:
        "Cuando manejas, me ves en la esquina, tengo ocho lados y una forma divina. ¿Quién soy?",
      respuestas: [
        { texto: "Octágono", esCorrecta: true },
        { texto: "Hexágono", esCorrecta: false },
        { texto: "Decágono", esCorrecta: false },
      ],
    },
    {
      id: "circulo",
      titulo: "Círculo",
      acertijo:
        "No tengo lados ni puntas tampoco, pero si me lanzas, ruedo poco a poco. ¿Quién soy?",
      respuestas: [
        { texto: "Círculo", esCorrecta: true },
        { texto: "Elipse", esCorrecta: false },
        { texto: "Óvalo", esCorrecta: false },
      ],
    },
    {
      id: "semicirculo",
      titulo: "Semicírculo",
      acertijo:
        "Nací del círculo al partirlo en dos, parezco una sonrisa si me ves con atención. ¿Quién soy?",
      respuestas: [
        { texto: "Trapecio", esCorrecta: false },
        { texto: "Triángulo", esCorrecta: false },
        { texto: "Semicírculo", esCorrecta: true },
      ],
    },
    {
      id: "trapecio",
      titulo: "Trapecio",
      acertijo:
        "Tengo cuatro lados, pero solo dos son paralelos. Parecen mis techos inclinados, ¡no soy nada feo! ¿Quién soy?",
      respuestas: [
        { texto: "Romboide", esCorrecta: false },
        { texto: "Trapecio", esCorrecta: true },
        { texto: "Triángulo", esCorrecta: false },
      ],
    },
  ],

  avanzado: [
    {
      id: "viral",
      titulo: "Triple viral (SRP)",
      acertijo:
        "Provoco fiebre, tos y puntitos rojos en la piel, soy muy contagioso y salto de niño en niño también. Gracias a una vacuna triple, ya no doy tanto miedo. ¿Qué vacuna me derrota?",
      respuestas: [
        {
          texto: "Varicela",
          esCorrecta: false,
        },
        {
          texto: "Triple viral (SRP: Sarampión, Rubéola y Paperas)",
          esCorrecta: true,
        },
        {
          texto: "Rotavirus",
          esCorrecta: false,
        },
      ],
    },
    {
      id: "dtp",
      titulo: "DTP",
      acertijo:
        "Te dejo sin aire con mi garganta inflamada, y antes mi ataque era una cosa muy temida. Una vacuna con tres nombres me detuvo enseguida. ¿Qué vacuna me detiene?",
      respuestas: [
        {
          texto: "DTP (Difteria, Tétanos y Tos ferina)",
          esCorrecta: true,
        },
        { texto: "BCG", esCorrecta: false },
        { texto: "Hepatitis B", esCorrecta: false },
      ],
    },
    {
      id: "polio",
      titulo: "Polio",
      acertijo:
        "Me gusta esconderme en los nervios y dejarte sin mover, antes muchos niños no podían correr. Pero con una vacuna oral me hicieron desaparecer. ¿Qué vacuna me frena?",
      respuestas: [
        { texto: "Triple viral", esCorrecta: false },
        {
          texto: "Polio (Sabin o IPV)",
          esCorrecta: true,
        },
        { texto: "Rotavirus", esCorrecta: false },
      ],
    },
    {
      id: "tetanos",
      titulo: "Tétanos / DTP",
      acertijo:
        "Si te cortas y no estás protegido, te dejo tieso y adolorido. Por suerte, hay una vacuna que evita el peligro. ¿Qué vacuna me detiene?",
      respuestas: [
        { texto: "Hepatitis A", esCorrecta: false },
        {
          texto: "DTP (Difteria, Tétanos y Tos ferina)",
          esCorrecta: true,
        },
        { texto: "BCG", esCorrecta: false },
      ],
    },
    {
      id: "hepatitis",
      titulo: "Hepatitis A",
      acertijo:
        "Me escondo en el agua y la comida contaminada, y dejo tu piel amarilla y cansada. Con una vacuna sencilla quedo derrotada. ¿Qué vacuna me frena?",
      respuestas: [
        { texto: "Neumocócica", esCorrecta: false },
        { texto: "Hepatitis A", esCorrecta: true },
        { texto: "Hepatitis B", esCorrecta: false },
      ],
    },
    {
      id: "paperas",
      titulo: "Paperas / triple viral",
      acertijo:
        "Me encanta inflar tu cara y causar fiebre, antes era común entre niños y mujeres. Una vacuna triple me deja sin poderes. ¿Qué vacuna me vence?",
      respuestas: [
        { texto: "Triple viral (SRP)", esCorrecta: true },
        { texto: "Hepatitis A", esCorrecta: false },
        { texto: "DTP", esCorrecta: false },
      ],
    },
    {
      id: "rotavirus",
      titulo: "Rotavirus",
      acertijo:
        "Provoco diarrea y vómito sin parar, especialmente en bebés al empezar. Con unas gotitas en la boca me puedes derrotar. ¿Qué vacuna me detiene?",
      respuestas: [
        { texto: "Neumocócica", esCorrecta: false },
        { texto: "Rotavirus", esCorrecta: true },
        { texto: "Hepatitis A", esCorrecta: false },
      ],
    },
    {
      id: "bcg",
      titulo: "BCG",
      acertijo:
        "Entro por el aire y ataco los pulmones, dejo tos y cansancio por montones. Una vacuna deja marca en el brazo, y me detiene con gran abrazo. ¿Qué vacuna me vence?",
      respuestas: [
        { texto: "BCG", esCorrecta: true },
        { texto: "DTP", esCorrecta: false },
        { texto: "Influenza", esCorrecta: false },
      ],
    },
    {
      id: "influenza",
      titulo: "Influenza",
      acertijo:
        "Cada año cambio de disfraz, te hago estornudar y moquear sin paz. Una vacuna anual me pone un alto eficaz. ¿Qué vacuna me detiene?",
      respuestas: [
        { texto: "Influenza", esCorrecta: true },
        { texto: "COVID-19", esCorrecta: false },
        { texto: "Neumocócica", esCorrecta: false },
      ],
    },
    {
      id: "varicela",
      titulo: "Varicela",
      acertijo:
        "Dejo granitos que dan picazón, y aunque soy leve, provoco irritación. Una vacuna evita mi invasión. ¿Qué vacuna me frena?",
      respuestas: [
        { texto: "Rotavirus", esCorrecta: false },
        { texto: "Varicela", esCorrecta: true },
        { texto: "Triple viral", esCorrecta: false },
      ],
    },
    {
      id: "prismaRectangular",
      titulo: "Prisma rectangular",
      acertijo:
        "Tengo 6 caras rectangulares y todas se enfrentan con orden, guardo cosas, soy práctico y me encuentras en cualquier rincón. ¿Quién soy?",
      respuestas: [
        { texto: "Cubo", esCorrecta: false },
        { texto: "Prisma rectangular", esCorrecta: true },
        { texto: "Pirámide", esCorrecta: false },
      ],
    },
    {
      id: "cubo",
      titulo: "Cubo",
      acertijo:
        "Tengo 6 caras cuadradas, 8 vértices y 12 aristas bien contadas. Me usan en los juegos y también en matemáticas.",
      respuestas: [
        { texto: "Esfera", esCorrecta: false },
        { texto: "Cilindro", esCorrecta: false },
        { texto: "Cubo", esCorrecta: true },
      ],
    },
    {
      id: "prisma",
      titulo: "Prisma",
      acertijo:
        "Tengo dos bases iguales y paralelas, mis caras laterales son rectángulos. Puedo ser triangular, cuadrangular o hexagonal.",
      respuestas: [
        { texto: "Prisma", esCorrecta: true },
        { texto: "Pirámide", esCorrecta: false },
        { texto: "Cono", esCorrecta: false },
      ],
    },
    {
      id: "piramide",
      titulo: "Pirámide",
      acertijo:
        "Tengo una base que puede ser cuadrada o triangular, y todas mis caras laterales se encuentran en un punto al brillar.",
      respuestas: [
        { texto: "Cilindro", esCorrecta: false },
        { texto: "Pirámide", esCorrecta: true },
        { texto: "Prisma", esCorrecta: false },
      ],
    },
    {
      id: "esfera",
      titulo: "Esfera",
      acertijo:
        "No tengo vértices ni caras planas, ruedo sin parar y soy totalmente suave. ¿Quién soy?",
      respuestas: [
        { texto: "Esfera", esCorrecta: true },
        { texto: "Cono", esCorrecta: false },
        { texto: "Cilindro", esCorrecta: false },
      ],
    },
    {
      id: "cilindro",
      titulo: "Cilindro",
      acertijo:
        "Tengo dos círculos arriba y abajo, y un cuerpo recto que parece un tubo. Sirvo para guardar agua o lápices, según tu gusto.",
      respuestas: [
        { texto: "Cono", esCorrecta: false },
        { texto: "Cilindro", esCorrecta: true },
        { texto: "Prisma", esCorrecta: false },
      ],
    },
    {
      id: "cono",
      titulo: "Cono",
      acertijo:
        "Tengo una base redonda y un solo vértice arriba, si me giras parezco un helado o una colina.",
      respuestas: [
        { texto: "Cono", esCorrecta: true },
        { texto: "Esfera", esCorrecta: false },
        { texto: "Pirámide", esCorrecta: false },
      ],
    },
    {
      id: "tetraedro",
      titulo: "Tetraedro",
      acertijo:
        "Tengo 4 caras, todas son triángulos iguales, no tengo base diferente ni lados desiguales.",
      respuestas: [
        { texto: "Tetraedro", esCorrecta: true },
        { texto: "Octaedro", esCorrecta: false },
        { texto: "Prisma triangular", esCorrecta: false },
      ],
    },
    {
      id: "octaedro",
      titulo: "Octaedro",
      acertijo:
        "Parezco dos pirámides pegadas por la base, mis 8 caras son triángulos, ¡qué elegancia y clase!",
      respuestas: [
        { texto: "Octaedro", esCorrecta: true },
        { texto: "Dodecaedro", esCorrecta: false },
        { texto: "Prisma hexagonal", esCorrecta: false },
      ],
    },
    {
      id: "dodecaedro",
      titulo: "Dodecaedro",
      acertijo:
        "Mis caras son pentágonos perfectos, y aunque soy difícil de dibujar, ¡soy muy geométrico y correcto!",
      respuestas: [
        { texto: "Dodecaedro", esCorrecta: true },
        { texto: "Icosaedro", esCorrecta: false },
        { texto: "Cubo", esCorrecta: false },
      ],
    },
  ],
};

type OrdenamientoProps = {
  nivel?: string;
  problematicas?: ProblematicaFlujoId[];
  steps?: number;
};

type NivelId = "basico" | "intermedio" | "avanzado";

type AcertijoJSON = {
  id: string;
  tema: string;
  pregunta: string;
  respuesta: string;
  opciones: string[];
};

type AcertijosRuntimeConfig = {
  autor?: string;
  version?: string;
  fecha?: string;
  descripcion?: string;
  nombreApp?: string;
  plataformas?: string[];
  nivel?: string;
  tiempoLimite?: number;
  categoria?: string;
  acertijos?: AcertijoJSON[];
  problematicas?: ProblematicaFlujoId[];
};

const formatPlataforma = (texto: string): string => {
  const mapa: Record<string, string> = {
    android: "Android",
    ios: "iOS",
    web: "Web",
  };
  return texto
    .split(/,\s*/)
    .map((p) => mapa[p.toLowerCase()] ?? p.charAt(0).toUpperCase() + p.slice(1))
    .join(", ");
};

const shuffleArray = <T,>(arr: T[]): T[] => {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

const transformarAcertijosJSON = (
  acertijosJSON: AcertijoJSON[],
): EscenarioFlujo[] => {
  return acertijosJSON.map((acertijo) => {
    const respuestas: RespuestaOpcion[] = acertijo.opciones.map((opcion) => ({
      texto: opcion,
      esCorrecta: opcion === acertijo.respuesta,
    }));

    return {
      id: acertijo.id as ProblematicaFlujoId,
      titulo: acertijo.tema,
      acertijo: acertijo.pregunta,
      respuestas,
    };
  });
};

const Acertijos: React.FC<OrdenamientoProps> = ({
  nivel = "basic",
  problematicas,
}) => {
  const configuracionNiveles: Record<
    NivelId,
    {
      numeroJuegos: number;
      puntosPorJuego: number;
      tiempoPorJuego: number;
    }
  > = {
    basico: {
      numeroJuegos: 3,
      puntosPorJuego: 10,
      tiempoPorJuego: 1,
    },
    intermedio: {
      numeroJuegos: 5,
      puntosPorJuego: 15,
      tiempoPorJuego: 1.4,
    },
    avanzado: {
      numeroJuegos: 7,
      puntosPorJuego: 20,
      tiempoPorJuego: 2.2,
    },
  };

  const normalizarNivelConfig = (n: string): NivelId => {
    const mapa: Record<string, NivelId> = {
      basico: "basico",
      basic: "basico",
      intermedio: "intermedio",
      intermediate: "intermedio",
      avanzado: "avanzado",
      advanced: "avanzado",
    };
    return mapa[n] || "basico";
  };

  const obtenerNombreNivel = (nivelKey: NivelId) => {
    const nombres: Record<NivelId, string> = {
      basico: "Básico",
      intermedio: "Intermedio",
      avanzado: "Avanzado",
    };
    return nombres[nivelKey] || nivelKey;
  };

  const [appName, setAppName] = useState("STEAM-G");
  const [appAutor, setAppAutor] = useState("STEAM-G");
  const [appVersion, setAppVersion] = useState("1.0.0");
  const [appFecha, setAppFecha] = useState("16 de Noviembre del 2025");
  const [appPlataformas, setAppPlataformas] = useState("Android, iOS y Web");
  const [appDescripcion, setAppDescripcion] = useState(
    "Lee el acertijo y selecciona la respuesta correcta antes de que termine el tiempo.",
  );
  const [configNivel, setConfigNivel] = useState<string | null>(null);
  const [configProblematicas, setConfigProblematicas] = useState<
    ProblematicaFlujoId[] | null
  >(null);
  const [configAcertijos, setConfigAcertijos] = useState<
    EscenarioFlujo[] | null
  >(null);
  const [configTiempoLimite, setConfigTiempoLimite] = useState<number | null>(
    null,
  );
  const [configCategoria, setConfigCategoria] = useState<string | null>(null);
  const [mostrarPantallaInicio, setMostrarPantallaInicio] = useState(true);
  const [showInformation, setShowInformation] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [pausado, setPausado] = useState(false);
  const [showPauseAlert, setShowPauseAlert] = useState(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [indiceJuegoActual, setIndiceJuegoActual] = useState(0);
  const nivelAUsar = configNivel !== null ? configNivel : nivel;
  const nivelConfigKey = normalizarNivelConfig(nivelAUsar);
  const config = configuracionNiveles[nivelConfigKey];
  const TIEMPO_POR_ACERTIJO = 60;
  const [tiempoRestante, setTiempoRestante] = useState(TIEMPO_POR_ACERTIJO);
  const [puntuacionTotal, setPuntuacionTotal] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [juegosCompletados, setJuegosCompletados] = useState(0);
  const [juegosFallados, setJuegosFallados] = useState(0);
  const [juegoActualCompletado, setJuegoActualCompletado] = useState(false);
  const [overlayFinJuego, setOverlayFinJuego] = useState<{
    abierto: boolean;
    puntosObtenidos: number;
    esCorrecta: boolean;
  }>({
    abierto: false,
    puntosObtenidos: 0,
    esCorrecta: true,
  });

  const [overlayTiempoAgotado, setOverlayTiempoAgotado] =
    useState<boolean>(false);

  const [overlayResumenFinal, setOverlayResumenFinal] =
    useState<boolean>(false);

  const [configLoaded, setConfigLoaded] = useState(false);

  useEffect(() => {
    const cargarConfig = async () => {
      try {
        const res = await fetch("/config/acertijos-config.json");

        if (!res.ok) {
          setConfigLoaded(true);
          return;
        }

        const data: AcertijosRuntimeConfig = await res.json();

        if (data.nombreApp) setAppName(data.nombreApp);
        if (data.autor) setAppAutor(data.autor);
        if (data.version) setAppVersion(data.version);
        if (data.fecha) setAppFecha(formatearFechaLarga(data.fecha));
        if (data.descripcion) setAppDescripcion(data.descripcion);
        if (data.plataformas) setAppPlataformas(data.plataformas.join(", "));
        if (data.nivel) setConfigNivel(data.nivel);
        if (data.problematicas) setConfigProblematicas(data.problematicas);
        if (data.tiempoLimite) setConfigTiempoLimite(data.tiempoLimite);
        if (data.categoria) setConfigCategoria(data.categoria);
        if (data.acertijos && data.acertijos.length > 0) {
          const acertijosTransformados = transformarAcertijosJSON(
            data.acertijos,
          );
          setConfigAcertijos(acertijosTransformados);
        }
      } catch (err) {
        console.error("No se pudo cargar acertijos-config.json", err);
      } finally {
        setConfigLoaded(true);
      }
    };

    cargarConfig();
  }, []);

  useEffect(() => {
    if (mostrarPantallaInicio) {
      setTiempoRestante(TIEMPO_POR_ACERTIJO);
    }
  }, [mostrarPantallaInicio]);

  const escenariosNivelBase = diccionarioFlujo[nivelConfigKey];

  const escenariosSeleccionados: EscenarioFlujo[] = (() => {
    if (configAcertijos && configAcertijos.length > 0) {
      return configAcertijos;
    }

    const problematicasAUsar =
      configProblematicas !== null ? configProblematicas : problematicas;
    if (problematicasAUsar && problematicasAUsar.length > 0) {
      return problematicasAUsar
        .map((id) =>
          escenariosNivelBase.find((escenario) => escenario.id === id),
        )
        .filter((escenario): escenario is EscenarioFlujo => !!escenario);
    }

    return escenariosNivelBase.slice(
      0,
      configuracionNiveles[nivelConfigKey].numeroJuegos,
    );
  })();

  const [acertijosAleatorios, setAcertijosAleatorios] = useState<
    EscenarioFlujo[]
  >([]);

  useEffect(() => {
    if (
      escenariosSeleccionados.length > 0 &&
      acertijosAleatorios.length === 0
    ) {
      setAcertijosAleatorios(shuffleArray(escenariosSeleccionados));
    }
  }, [escenariosSeleccionados]);

  const totalJuegos =
    acertijosAleatorios.length || escenariosSeleccionados.length || 1;

  const escenarioActual: EscenarioFlujo =
    acertijosAleatorios[indiceJuegoActual] ||
    acertijosAleatorios[0] ||
    escenariosSeleccionados[0] ||
    escenariosNivelBase[0];

  const formatearFechaLarga = (isoDate?: string) => {
    if (!isoDate) return appFecha;

    const [year, month, day] = isoDate.split("-");
    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    const mesIndex = Number(month) - 1;
    if (mesIndex < 0 || mesIndex > 11) return isoDate;

    return `${Number(day)} de ${meses[mesIndex]} del ${year}`;
  };

  const [respuestasOrdenadas, setRespuestasOrdenadas] = useState<
    RespuestaOpcion[]
  >([]);

  const [respuestaSeleccionada, setRespuestaSeleccionada] =
    useState<RespuestaOpcion | null>(null);

  const [ultimaRespuestaCorrecta, setUltimaRespuestaCorrecta] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    setJuegoActualCompletado(false);
    setRespuestaSeleccionada(null);
    setUltimaRespuestaCorrecta(null);
    setRespuestasOrdenadas(shuffleArray(escenarioActual.respuestas));
  }, [indiceJuegoActual, escenarioActual.id]);

  const handleRespuestaSeleccionada = (respuesta: RespuestaOpcion) => {
    if (juegoTerminado || overlayFinJuego.abierto || overlayTiempoAgotado) {
      return;
    }

    setRespuestaSeleccionada(respuesta);
    setUltimaRespuestaCorrecta(respuesta.esCorrecta);

    if (respuesta.esCorrecta) {
      const puntosObtenidos = config.puntosPorJuego;
      setPuntuacionTotal((prev) => prev + puntosObtenidos);
      setJuegosCompletados((prev) => prev + 1);
      setJuegoActualCompletado(true);
      setOverlayFinJuego({
        abierto: true,
        puntosObtenidos,
        esCorrecta: true,
      });
    } else {
      setJuegosFallados((prev) => prev + 1);
      setJuegoActualCompletado(true);
      setOverlayFinJuego({
        abierto: true,
        puntosObtenidos: 0,
        esCorrecta: false,
      });
    }
  };

  const avanzarAlSiguienteJuego = () => {
    const esUltimoJuego = indiceJuegoActual + 1 >= totalJuegos;

    if (esUltimoJuego) {
      setJuegoTerminado(true);
      setOverlayResumenFinal(true);
      return;
    }

    setIndiceJuegoActual((prev) => prev + 1);
    setTiempoRestante(TIEMPO_POR_ACERTIJO);
  };

  const handleCerrarOverlayFinJuego = () => {
    setOverlayFinJuego((prev) => ({ ...prev, abierto: false }));
    avanzarAlSiguienteJuego();
  };

  const handleCerrarOverlayTiempoAgotado = () => {
    setOverlayTiempoAgotado(false);
    setJuegosFallados((prev) => prev + 1);
    avanzarAlSiguienteJuego();
  };

  useEffect(() => {
    if (
      mostrarPantallaInicio ||
      showCountdown ||
      pausado ||
      showPauseAlert ||
      overlayResumenFinal ||
      juegoTerminado ||
      tiempoRestante <= 0 ||
      overlayFinJuego.abierto ||
      overlayTiempoAgotado
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [
    mostrarPantallaInicio,
    showCountdown,
    pausado,
    showPauseAlert,
    overlayResumenFinal,
    juegoTerminado,
    tiempoRestante,
    overlayFinJuego.abierto,
    overlayTiempoAgotado,
  ]);

  useEffect(() => {
    if (tiempoRestante === 0 && !juegoTerminado && !juegoActualCompletado) {
      setOverlayTiempoAgotado(true);
    }
  }, [tiempoRestante, juegoTerminado, juegoActualCompletado]);

  useEffect(() => {
    if (!overlayFinJuego.abierto) return;

    const timeoutId = window.setTimeout(() => {
      handleCerrarOverlayFinJuego();
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [overlayFinJuego.abierto]);

  useEffect(() => {
    if (!overlayTiempoAgotado) return;

    const timeoutId = window.setTimeout(() => {
      handleCerrarOverlayTiempoAgotado();
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [overlayTiempoAgotado]);

  useEffect(() => {
    if (!showCountdown) return;

    setCountdown(5);

    const intervalId = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [showCountdown]);

  useEffect(() => {
    if (!showCountdown) return;

    if (countdown === 0) {
      const t = window.setTimeout(() => {
        setShowCountdown(false);
        setCountdown(5);
      }, 700);

      return () => window.clearTimeout(t);
    }
  }, [countdown, showCountdown]);

  const formatearTiempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos}:${segs.toString().padStart(2, "0")}`;
  };

  const reiniciarJuego = () => {
    setJuegoTerminado(false);

    setOverlayResumenFinal(false);
    setOverlayTiempoAgotado(false);
    setOverlayFinJuego({
      abierto: false,
      puntosObtenidos: 0,
      esCorrecta: true,
    });

    setIndiceJuegoActual(0);
    setTiempoRestante(TIEMPO_POR_ACERTIJO);
    setPuntuacionTotal(0);
    setJuegosCompletados(0);
    setJuegosFallados(0);

    setJuegoActualCompletado(false);
    setRespuestaSeleccionada(null);
    setUltimaRespuestaCorrecta(null);

    const nuevosAcertijosAleatorios = shuffleArray(escenariosSeleccionados);
    setAcertijosAleatorios(nuevosAcertijosAleatorios);
    setRespuestasOrdenadas(
      shuffleArray(nuevosAcertijosAleatorios[0]?.respuestas || []),
    );

    setShowInstructions(false);
  };

  const handleIniciarJuego = () => {
    reiniciarJuego();
    setMostrarPantallaInicio(false);
    setShowCountdown(true);
  };

  const handleInformation = () => {
    setShowInformation((prev) => !prev);
  };

  const handleExitToStart = () => {
    setShowPauseAlert(false);
    setPausado(false);

    setShowCountdown(false);
    setShowInstructions(false);
    setOverlayFinJuego({
      abierto: false,
      puntosObtenidos: 0,
      esCorrecta: true,
    });
    setOverlayTiempoAgotado(false);
    setOverlayResumenFinal(false);

    setJuegoTerminado(true);
    setMostrarPantallaInicio(true);
  };

  const handleCerrarAplicacion = () => {
    if (Capacitor.isNativePlatform()) {
      CapacitorApp.exitApp();
      return;
    }

    if (typeof window !== "undefined" && window.close) {
      window.close();
    }
  };

  const handlePausar = () => {
    if (
      mostrarPantallaInicio ||
      showCountdown ||
      overlayResumenFinal ||
      overlayFinJuego.abierto ||
      overlayTiempoAgotado ||
      juegoTerminado ||
      pausado
    ) {
      return;
    }

    setPausado(true);
    setShowPauseAlert(true);
  };

  const handleReanudar = () => {
    setShowPauseAlert(false);
    setPausado(false);
  };

  const handleSalirDesdePausa = () => {
    setShowPauseAlert(false);
    setPausado(false);
    reiniciarJuego();
    setMostrarPantallaInicio(true);
  };

  const generarConfeti = () => {
    const colores = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
    ];

    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      color: colores[Math.floor(Math.random() * colores.length)],
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
    }));
  };

  return (
    <IonPage>
      {showCountdown && countdown > 0 && (
        <div className="countdown-overlay">
          <div className="countdown-number">{countdown}</div>
        </div>
      )}

      {showPauseAlert && (
        <div className="pause-overlay" onClick={() => {}}>
          <div className="pause-card" onClick={(e) => e.stopPropagation()}>
            <h2>Juego en pausa</h2>
            <p>El tiempo se ha detenido.</p>

            <IonButton
              expand="block"
              id="resume"
              style={{ marginTop: "18px" }}
              onClick={handleReanudar}
            >
              <IonIcon slot="start" icon={playCircleOutline}></IonIcon>
              Reanudar
            </IonButton>

            <IonButton
              expand="block"
              id="finalize"
              style={{ marginTop: "10px" }}
              onClick={handleSalirDesdePausa}
            >
              <IonIcon slot="start" icon={homeOutline}></IonIcon>
              Finalizar juego
            </IonButton>

            <IonButton
              expand="block"
              id="exit"
              style={{ marginTop: "10px" }}
              onClick={handleCerrarAplicacion}
            >
              <IonIcon slot="start" icon={exitOutline}></IonIcon>
              Cerrar aplicación
            </IonButton>
          </div>
        </div>
      )}

      {showInformation && (
        <div className="info-modal-background" onClick={handleInformation}>
          <div className="info-modal" onClick={(e) => e.stopPropagation()}>
            <div className="header">
              <h2 style={{ color: "var(--color-primary)", fontWeight: "bold" }}>
                {appName}
              </h2>
              <p
                style={{
                  color: "#8b8b8bff",
                  marginTop: "5px",
                  textAlign: "center",
                }}
              >
                Actividad configurada desde la plataforma Steam-G
              </p>
            </div>

            <div className="cards-info">
              <div className="card">
                <p className="title">VERSIÓN</p>
                <p className="data">{appVersion}</p>
              </div>

              <div className="card">
                <p className="title">FECHA DE CREACIÓN</p>
                <p className="data">{appFecha}</p>
              </div>

              <div className="card">
                <p className="title">PLATAFORMAS</p>
                <p className="data">{formatPlataforma(appPlataformas)}</p>
              </div>

              <div className="card">
                <p className="title">NÚMERO DE ACERTIJOS</p>
                <p className="data">{escenariosSeleccionados.length}</p>
              </div>

              <div className="card description">
                <p className="title">DESCRIPCIÓN</p>
                <p className="data">{appDescripcion}</p>
              </div>
            </div>

            <div className="button">
              <IonButton expand="block" onClick={handleInformation}>
                Cerrar
              </IonButton>
            </div>
          </div>
        </div>
      )}

      {overlayTiempoAgotado && (
        <div className="defeat-overlay">
          <div className="defeat-message">
            <h2 style={{ fontWeight: "bold" }}>¡Tiempo agotado! ⏰</h2>
            <p>No lograste responder el acertijo a tiempo.</p>
            <p>Pasando al siguiente acertijo...</p>
          </div>
        </div>
      )}

      {overlayFinJuego.abierto && (
        <div
          className={
            overlayFinJuego.esCorrecta ? "victory-overlay" : "defeat-overlay"
          }
        >
          <div
            className={
              overlayFinJuego.esCorrecta ? "victory-message" : "defeat-message"
            }
          >
            <h2 style={{ fontWeight: "bold" }}>
              {overlayFinJuego.esCorrecta ? "¡Muy bien! 🎉" : "¡Ups! ❌"}
            </h2>

            <p>
              {overlayFinJuego.esCorrecta
                ? "Has respondido correctamente el acertijo."
                : "La respuesta fue incorrecta."}
            </p>

            <p>
              <strong>
                Has ganado +
                {overlayFinJuego.esCorrecta
                  ? overlayFinJuego.puntosObtenidos
                  : 0}{" "}
                puntos
              </strong>
            </p>

            <p>Preparando el siguiente acertijo...</p>
          </div>

          {overlayFinJuego.esCorrecta && (
            <div className="confetti-container">
              {generarConfeti().map((particula) => (
                <div
                  key={particula.id}
                  className="confetti"
                  style={{
                    backgroundColor: particula.color,
                    left: `${particula.left}%`,
                    animationDelay: `${particula.delay}s`,
                    animationDuration: `${particula.duration}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {overlayResumenFinal && (
        <div className="summary-overlay">
          <div className="summary-message">
            <h2 style={{ fontWeight: "bold" }}>Juego terminado</h2>

            <div className="resumen-final">
              <h3>Resultados finales</h3>

              <p>
                <strong>Acertijos correctos:</strong>
              </p>
              <p>
                {juegosCompletados} de {totalJuegos}
              </p>

              <p>
                <strong>Acertijos sin resolver:</strong>
              </p>
              <p>{juegosFallados}</p>

              <p>
                <strong>Puntuación total:</strong>
              </p>
              <p>{puntuacionTotal} puntos</p>

              <IonBadge className="badge">
                {juegosCompletados === totalJuegos
                  ? "¡PERFECTO! 🏆"
                  : juegosCompletados > juegosFallados
                    ? "¡Buen trabajo! 👍"
                    : "¡Sigue intentando! 💪"}
              </IonBadge>
            </div>

            <IonButton id="finalize" expand="block" onClick={handleExitToStart}>
              <IonIcon icon={refresh} slot="start" />
              Jugar de Nuevo
            </IonButton>

            <IonButton
              id="exit"
              expand="block"
              onClick={handleCerrarAplicacion}
            >
              <IonIcon slot="start" icon={exitOutline}></IonIcon>
              Cerrar aplicación
            </IonButton>
          </div>

          <div className="confetti-container">
            {generarConfeti().map((particula) => (
              <div
                key={particula.id}
                className="confetti"
                style={{
                  backgroundColor: particula.color,
                  left: `${particula.left}%`,
                  animationDelay: `${particula.delay}s`,
                  animationDuration: `${particula.duration}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {showInstructions && (
        <div className="ins-overlay" onClick={() => setShowInstructions(false)}>
          <div className="ins-card" onClick={(e) => e.stopPropagation()}>
            <div className="ins-title">
              <h2
                style={{
                  margin: 0,
                  fontWeight: "bold",
                  color: "var(--color-primary)",
                }}
              >
                Reglas Básicas
              </h2>
              <IonIcon
                icon={closeCircleOutline}
                style={{
                  fontSize: "26px",
                  color: "var(--color-primary)",
                }}
                onClick={() => setShowInstructions(false)}
              />
            </div>

            <div className="ins-stats">
              <p style={{ textAlign: "justify" }}>
                <strong>
                  Resuelve el acertijo seccionando la respuesta correcta.
                </strong>
              </p>
            </div>
          </div>
        </div>
      )}

      <IonContent fullscreen className="ion-padding">
        {mostrarPantallaInicio ? (
          <div className="inicio-container">
            <div className="header-game ion-no-border">
              <div className="toolbar-game">
                <div className="titles start-page">
                  <h1>{appName}</h1>
                </div>
              </div>
            </div>

            <div className="info-juego">
              <div className="info-item">
                <IonChip>
                  <strong>Nivel: {obtenerNombreNivel(nivelConfigKey)}</strong>
                </IonChip>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              className="page-start-btns"
            >
              <IonButton onClick={handleIniciarJuego} className="play">
                <IonIcon slot="start" icon={playCircleOutline}></IonIcon>
                Iniciar juego
              </IonButton>

              <IonButton onClick={handleInformation} className="info">
                <IonIcon slot="start" icon={informationCircleOutline}></IonIcon>
                Información
              </IonButton>
            </div>
          </div>
        ) : (
          <>
            <div className="header-game ion-no-border">
              <div className="toolbar-game">
                <div className="titles">
                  <h1>STEAM-G</h1>
                  <IonIcon
                    icon={alertCircleOutline}
                    size="small"
                    id="info-diagrama"
                  />
                  <IonPopover
                    trigger="info-diagrama"
                    side="bottom"
                    alignment="center"
                  >
                    <IonCard className="filter-card ion-no-margin">
                      <div className="section header-section">
                        <h2>{appName}</h2>
                      </div>

                      <div className="section description-section">
                        <p>{appDescripcion}</p>
                      </div>

                      <div className="section footer-section">
                        <span>{appFecha}</span>
                      </div>
                    </IonCard>
                  </IonPopover>
                </div>

                <span>
                  <strong>{appName}</strong>
                </span>
              </div>
            </div>

            <div className="instructions-exercises">
              <div className="num-words">
                <strong>
                  Juego {indiceJuegoActual + 1} de {totalJuegos}
                </strong>
              </div>

              <div className="temporizador">
                <IonIcon icon={time} className="icono-tiempo" />
                <h5 className="tiempo-display">
                  {formatearTiempo(tiempoRestante)}
                </h5>
              </div>

              <div className="num-words">
                <strong>Puntuación: {puntuacionTotal}</strong>
              </div>

              <div className="rules" onClick={() => setShowInstructions(true)}>
                Reglas Básicas
              </div>
            </div>

            <div className="juego-container">
              <div className="acertijo-card">
                <p>{escenarioActual.acertijo}</p>
              </div>

              <div className="respuestas-container">
                {(respuestasOrdenadas.length
                  ? respuestasOrdenadas
                  : escenarioActual.respuestas
                ).map((respuesta, index) => {
                  const esSeleccionada = respuestaSeleccionada === respuesta;

                  const clasesAdicionales =
                    esSeleccionada && ultimaRespuestaCorrecta === true
                      ? " respuesta-card-correcta"
                      : esSeleccionada && ultimaRespuestaCorrecta === false
                        ? " respuesta-card-incorrecta"
                        : "";

                  return (
                    <IonCard
                      key={`${escenarioActual.id}-${respuesta.texto}-${index}`}
                      className={
                        "respuesta-card respuesta-card-entrada" +
                        clasesAdicionales
                      }
                      button
                      onClick={() => handleRespuestaSeleccionada(respuesta)}
                    >
                      <div className="respuesta-card-title">
                        <h3>{respuesta.texto}</h3>
                      </div>
                      <div className="respuesta-card-content">
                        <IonIcon
                          style={{
                            width: "50px",
                            height: "50px",
                            color: "var(--color-primary)",
                          }}
                          icon={helpCircleOutline}
                        />
                      </div>
                    </IonCard>
                  );
                })}
              </div>
            </div>

            <div className="button game">
              <IonButton
                expand="full"
                shape="round"
                onClick={handlePausar}
                disabled={
                  pausado ||
                  showCountdown ||
                  overlayFinJuego.abierto ||
                  overlayTiempoAgotado ||
                  overlayResumenFinal
                }
              >
                <IonIcon slot="start" icon={pauseCircleOutline} />
                Pausar
              </IonButton>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Acertijos;
