import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert, Platform, StatusBar, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const primaryColor = '#1A1A2E';
const accentColor = '#E94560';
const backgroundColor = '#0A0A1A';
const cardColor = '#16213E';
const cardColorAlt = '#0F3460';
const textPrimary = '#E2E8F0';
const textSecondary = '#8892A4';
const successColor = '#00C896';
const warningColor = '#FFB347';
const borderColor = '#2A2A4A';

const unit1Color = '#2D6B1B';
const unit1TextColor = '#FFFFFF';
const unit2Color = '#6B3A2A';
const unit2TextColor = '#FFFFFF';

const ITEMS = {
  'u1_p1': { name: 'Stundenplan', nameDe: 'Stundenplan', emoji: '📅' },
  'u1_p2': { name: 'Kreide', nameDe: 'Kreide', emoji: '🖍️' },
  'u1_p3': { name: 'Tagebuch', nameDe: 'Tagebuch', emoji: '📓' },
  'u1_p4': { name: 'Kaffeetasse', nameDe: 'Kaffeetasse', emoji: '☕' },
  'u1_p5': { name: 'Quittung', nameDe: 'Quittung', emoji: '🧾' },
  'u1_p6': { name: 'Bibliotheksausweis', nameDe: 'Bibliotheksausweis', emoji: '📇' },
  'u1_p7': { name: 'Altes Buch', nameDe: 'Altes Buch', emoji: '📖' },
  'u1_p8': { name: 'Foto Fragment', nameDe: 'Foto Fragment', emoji: '📸' },
  'u1_p9': { name: 'Schlüssel', nameDe: 'Schlüssel', emoji: '🔑' },
  'u2_p1': { name: 'Katzenhaar', nameDe: 'Katzenhaar', emoji: '🐱' },
  'u2_p2': { name: 'Leere Tasse', nameDe: 'Leere Tasse', emoji: '☕' },
  'u2_p3': { name: 'Spiegelscherbe', nameDe: 'Spiegelscherbe', emoji: '🪞' },
  'u2_p4': { name: 'Altes Foto', nameDe: 'Altes Foto', emoji: '📸' },
  'u2_p5': { name: 'Halsband', nameDe: 'Halsband', emoji: '🔴' },
  'u2_p6': { name: 'Verwelkte Blume', nameDe: 'Verwelkte Blume', emoji: '🌻' },
  'u2_p7': { name: 'Tagebuch', nameDe: 'Tagebuch', emoji: '📓' },
  'u2_p8': { name: 'Leere Medizinflasche', nameDe: 'Leere Medizinflasche', emoji: '💊' },
  'u2_p9': { name: 'Silberschlüssel', nameDe: 'Silberschlüssel', emoji: '🔑' },
};

const UNITS = [
  {
    id: 'unit_1',
    name: '📚 Erste Einheit',
    title: '《Die letzte Stunde》',
    subtitle: 'Das Geheimnis von Anna',
    unlocked: true,
    bgColor: unit1Color,
    textColor: unit1TextColor,
    rooms: [
      {
        id: 'room_1_1',
        name: '📖 Klassenzimmer',
        description: 'Eine reiche Familie engagiert dich: "Meine Tochter Anna ist in Deutschland verschwunden..." Du kommst in der Schule an. Die Türen sind verschlossen.',
        color: '#2D6B1B',
        story: '📚 Erste Szene: Verschlossenes Klassenzimmer\n\nDu wachst auf und bist in einem Klassenzimmer eingesperrt.\n\nAn der Tafel steht: "Willkommen im Labyrinth. Wer Anna sucht, muss zuerst sich selbst finden."',
        puzzles: [
          {
            id: 'u1_p1',
            title: '⏰ Zeiträtsel',
            description: 'Ein Zettel in Annas Buch: "Wenn du mich suchst, schau nach, wo die Zeit stehen bleibt."\n\nDu siehst die Uhr an der Wand: ein Zeiger zeigt auf 10, der andere auf 3.',
            emoji: '⏰',
            hint: 'Kurzer Zeiger = Stunde, langer Zeiger = Minute',
            solution: '1015',
            reward: ITEMS['u1_p1'].name,
            rewardDe: ITEMS['u1_p1'].nameDe,
            rewardEmoji: ITEMS['u1_p1'].emoji,
            isFinal: false,
            question: 'Gib die Uhrzeit ein:',
            storyIntro: '📖 Ein Zettel: "Wenn du mich suchst, schau nach, wo die Zeit stehen bleibt."\n\nDie Uhr an der Wand steht still.',
            storyOutro: '✨ "Richtig!"\n\nDu findest einen Stundenplan in Annas Tisch.'
          },
          {
            id: 'u1_p2',
            title: '📋 Stundenplan',
            description: '1. Klasse: Deutsch, 2. Klasse: Mathe, 3. Klasse: ???\nSchlüssel: 1=D, 2=M, 3=?\n\n💡 Kostenloser Hinweis: Daily my life',
            emoji: '📋',
            hint: 'Latein',
            solution: 'LATEIN',
            reward: ITEMS['u1_p2'].name,
            rewardDe: ITEMS['u1_p2'].nameDe,
            rewardEmoji: ITEMS['u1_p2'].emoji,
            isFinal: false,
            question: 'Gib den Namen des dritten Faches ein:',
            storyIntro: '📖 Der Stundenplan: "1=D, 2=M, 3=?"\n\n💡 Hinweis: Daily my life',
            storyOutro: '✨ "Latein... richtig!"\n\nAnnas Spind knackt leise...'
          },
          {
            id: 'u1_p3',
            title: '🔐 Spind',
            description: 'Hinweis: "Mein Geburtsjahr ist die Antwort der ersten Frage. Mein Lieblingstier ist der zweite Buchstabe."',
            emoji: '🔐',
            hint: 'Erste Antwort = 1015, zweite Antwort = L',
            solution: '1015L',
            reward: ITEMS['u1_p3'].name,
            rewardDe: ITEMS['u1_p3'].nameDe,
            rewardEmoji: ITEMS['u1_p3'].emoji,
            isFinal: false,
            question: 'Gib das Passwort ein:',
            storyIntro: '📖 Ein Zettel am Spind: "Mein Geburtsjahr ist die Lösung der ersten Frage. Mein Lieblingstier ist der erste Buchstabe der zweiten Antwort."',
            storyOutro: '✨ "1015L... richtig!"\n\nDer Spind öffnet sich. Du findest ein Tagebuch und eine Quittung.\n\nIm Tagebuch: "Herr Kern... ich habe Angst vor ihm."\n\nAuf der Quittung: "Sie kommt jeden Freitag um 15 Uhr hierher."'
          }
        ],
        items: []
      },
      {
        id: 'room_1_2',
        name: '☕ Café',
        description: 'Das Café, in das Anna oft ging.',
        color: '#8B5A2B',
        story: '☕ Zweite Szene: Geheimnisvolles Café\n\nDu kommst ins Café. Der Besitzer wird blass, als er die Quittung sieht.\n\n"Sie... sie kam jeden Freitag. Das letzte Mal sah sie sehr verängstigt aus."\n\nEr gibt dir einen Umschlag: "Sie hat mich gebeten, das demjenigen zu geben, der nach ihr sucht."',
        puzzles: [
          {
            id: 'u1_p4',
            title: '👨‍🏫 Der gefürchtete Lehrer',
            description: 'Auf Annas Kaffeetasse steht: "Der Name des Lehrers, den ich am meisten fürchte."',
            emoji: '👨‍🏫',
            hint: 'Im Tagebuch steht "Herr Kern"',
            solution: 'HERR KERN',
            reward: ITEMS['u1_p4'].name,
            rewardDe: ITEMS['u1_p4'].nameDe,
            rewardEmoji: ITEMS['u1_p4'].emoji,
            isFinal: false,
            question: 'Gib den Namen des Lehrers ein:',
            storyIntro: '☕ Du nimmst Annas Tasse. Am Boden steht: "Der Name des Lehrers, den ich am meisten fürchte."\n\nAn der Wand hängen Fotos der Lehrer: Herr Schmidt, Frau Weber, Herr Kern, Frau Richter',
            storyOutro: '✨ "Herr Kern... richtig!"\n\nDer Besitzer seufzt: "Er ist wirklich... beunruhigend."'
          },
          {
            id: 'u1_p5',
            title: '✉️ Umschlag',
            description: 'Der Besitzer gibt dir einen Umschlag. Darin ein Zettel: "5+3, 7+2, 4+6 = ???"',
            emoji: '✉️',
            hint: 'Rechne: 8, 9, 10 → 819',
            solution: '819',
            reward: ITEMS['u1_p5'].name,
            rewardDe: ITEMS['u1_p5'].nameDe,
            rewardEmoji: ITEMS['u1_p5'].emoji,
            isFinal: false,
            question: 'Gib den Code ein:',
            storyIntro: '✉️ Du öffnest den Umschlag. Ein Zettel: "5+3, 7+2, 4+6 = ???"',
            storyOutro: '✨ "819... richtig!"\n\nIm Umschlag ist noch ein Bibliotheksausweis. Anna hat "Das Geheimnis der Bibliothek" ausgeliehen.'
          },
          {
            id: 'u1_p6',
            title: '📇 Bibliotheksausweis',
            description: 'Anna hat "Das Geheimnis der Bibliothek" ausgeliehen.',
            emoji: '📇',
            hint: 'Beliebige Eingabe',
            solution: 'OK',
            reward: ITEMS['u1_p6'].name,
            rewardDe: ITEMS['u1_p6'].nameDe,
            rewardEmoji: ITEMS['u1_p6'].emoji,
            isFinal: true,
            question: 'Gib etwas ein:',
            storyIntro: '📇 Ein Ausweis: Anna hat "Das Geheimnis der Bibliothek" ausgeliehen.\n\nDort... dort könnte das letzte Geheimnis sein.',
            storyOutro: '✨ Du gehst zur Bibliothek.'
          }
        ],
        items: []
      },
      {
        id: 'room_1_3',
        name: '📚 Bibliothek',
        description: 'Der verbotene Bereich der Bibliothek.',
        color: '#3A2A6B',
        story: '📚 Dritte Szene: Verbotener Bereich\n\nDu gehst in den Keller der Bibliothek. Staub liegt in der Luft.\n\nEin altes Buch... das sollte das sein, das Anna ausgeliehen hat.',
        puzzles: [
          {
            id: 'u1_p7',
            title: '📚 Bücherregal',
            description: 'Fünf Bücher. Die Anfangsbuchstaben ergeben "LICHT". Die Nummern auf den Buchrücken: L-1, i-7, c-7, h-1, t-6',
            emoji: '📚',
            hint: 'Zusammensetzen: 17716',
            solution: '17716',
            reward: ITEMS['u1_p7'].name,
            rewardDe: ITEMS['u1_p7'].nameDe,
            rewardEmoji: ITEMS['u1_p7'].emoji,
            isFinal: false,
            question: 'Gib den Code ein:',
            storyIntro: '📚 Du findest das Buch. Auf dem Buchrücken stehen Zahlen: L-1, i-7, c-7, h-1, t-6\n\nSetze sie zusammen...',
            storyOutro: '✨ "17716... richtig!"\n\nDas Regal verschiebt sich. Eine Tür erscheint.'
          },
          {
            id: 'u1_p8',
            title: '📓 Tagebuchfragmente',
            description: 'Fragment 1: "Er sagt, ich soll ihm vertrauen..." Fragment 2: "...aber ich habe Angst vor ihm." Fragment 3: "Wenn etwas passiert, schau das..."',
            emoji: '📓',
            hint: 'Tagebuch',
            solution: 'TAGEBUCH',
            reward: ITEMS['u1_p8'].name,
            rewardDe: ITEMS['u1_p8'].nameDe,
            rewardEmoji: ITEMS['u1_p8'].emoji,
            isFinal: false,
            question: 'Gib das letzte Wort ein:',
            storyIntro: '📓 Du setzt die Fragmente zusammen.\n\n"Wenn etwas passiert, schau das..."\n\nWas?',
            storyOutro: '✨ "Tagebuch... richtig!"\n\nDie letzte Seite: "Wenn ich verschwinde, gehe in den Dachboden."'
          },
          {
            id: 'u1_p9',
            title: '🚪 Die letzte Tür',
            description: 'Code: Zeit + Lehrername + Büchercode',
            emoji: '🚪',
            hint: '1015 + HERRKERN + 17716',
            solution: '1015HERRKERN17716',
            reward: ITEMS['u1_p9'].name,
            rewardDe: ITEMS['u1_p9'].nameDe,
            rewardEmoji: ITEMS['u1_p9'].emoji,
            isFinal: true,
            question: 'Gib den endgültigen Code ein:',
            storyIntro: '🚪 Die Tür verlangt einen Code.\n\nTipp: Zeit aus dem Klassenzimmer + Name des Lehrers + Nummer aus dem Bücherregal',
            storyOutro: '✨ "1015HERRKERN17716... Zugang gewährt!"\n\nDie Tür öffnet sich. Der Raum ist leer. Nur ein Foto und ein Brief.\n\n"Es tut mir leid. Ich kann nicht mehr."\n\n🏆 Ende B: Anna verschwindet.'
          }
        ],
        items: []
      }
    ]
  },
  {
    id: 'unit_2',
    name: '🤔 Zweite Einheit',
    title: '《Der Morgen der Amnesie》',
    subtitle: 'Wer bin ich?',
    unlocked: false,
    bgColor: unit2Color,
    textColor: unit2TextColor,
    rooms: [
      {
        id: 'room_2_1',
        name: '🛏️ Schlafzimmer',
        description: 'Du wachst in einem riesigen Bett auf und erinnerst dich an nichts.',
        color: '#6B3A2A',
        story: '🌅 Erste Szene: Fremdes Schlafzimmer\n\nDu öffnest die Augen. Dein Kopf schmerzt. Wo bist du? Wer bist du?',
        puzzles: [
          {
            id: 'u2_p1',
            title: '⏰ Wecker',
            description: '8:15 auf dem Wecker, aber die Sonne scheint von Westen...',
            emoji: '⏰',
            hint: 'Zeit ist falsch',
            solution: 'ZEIT IST FALSCH',
            reward: ITEMS['u2_p1'].name,
            rewardDe: ITEMS['u2_p1'].nameDe,
            rewardEmoji: ITEMS['u2_p1'].emoji,
            isFinal: false,
            question: 'Was fällt dir auf?',
            storyIntro: '⏰ 8:15 Uhr, aber die Sonne scheint von Westen...\n\nDas ist unmöglich.',
            storyOutro: '✨ "Die Zeit ist falsch... richtig!"\n\nEtwas stimmt hier nicht.'
          },
          {
            id: 'u2_p2',
            title: '👔 Kleiderschrank',
            description: 'Nur Damenkleidung. An der Kleidung klebt ein silbernes Haar.',
            emoji: '👔',
            hint: 'Silbernes Haar',
            solution: 'KATZENHAAR',
            reward: ITEMS['u2_p2'].name,
            rewardDe: ITEMS['u2_p2'].nameDe,
            rewardEmoji: ITEMS['u2_p2'].emoji,
            isFinal: false,
            question: 'Was hast du gefunden?',
            storyIntro: '👔 Du öffnest den Schrank. Alles Damenkleidung.\n\nEin silbernes Haar...\n\nVon welchem Tier?',
            storyOutro: '✨ "Katzenhaar... richtig!"\n\nDu fragst dich, wer du wirklich bist.'
          },
          {
            id: 'u2_p3',
            title: '🪞 Spiegel',
            description: 'Du hebst deine rechte Hand. Die Spiegelreflexion hebt die linke.',
            emoji: '🪞',
            hint: 'Du bist kein Mensch',
            solution: 'KEIN MENSCH',
            reward: ITEMS['u2_p3'].name,
            rewardDe: ITEMS['u2_p3'].nameDe,
            rewardEmoji: ITEMS['u2_p3'].emoji,
            isFinal: true,
            question: 'Was schlussfolgerst du?',
            storyIntro: '🪞 Du stehst vor dem Spiegel.\n\nDu hebst deine rechte Hand. Im Spiegel hebt jemand die linke.\n\nWarum?',
            storyOutro: '✨ "Kein Mensch... richtig!"\n\nDas Spiegelbild zwinkert dir zu.'
          }
        ],
        items: []
      },
      {
        id: 'room_2_2',
        name: '🍽️ Esszimmer',
        description: 'Frühstück auf dem Tisch.',
        color: '#8B5A2B',
        story: '🍽️ Zweite Szene: Das Geheimnis am Tisch\n\nDu gehst ins Esszimmer. Ein gedeckter Tisch.\n\nKaffeeduft... dir wird schwindelig.',
        puzzles: [
          {
            id: 'u2_p4',
            title: '☕ Kaffeetasse',
            description: 'Unterteller: "Der letzte Schluck war dein letzter."',
            emoji: '☕',
            hint: 'Kaffee',
            solution: 'KAFFEE',
            reward: ITEMS['u2_p4'].name,
            rewardDe: ITEMS['u2_p4'].nameDe,
            rewardEmoji: ITEMS['u2_p4'].emoji,
            isFinal: false,
            question: 'Was hat dich getötet?',
            storyIntro: '☕ "Der letzte Schluck war dein letzter."\n\nDie letzte Tasse Kaffee...',
            storyOutro: '✨ "Kaffee... richtig!"\n\nPlötzlich ein stechender Schmerz.'
          },
          {
            id: 'u2_p5',
            title: '🍳 Zettel',
            description: '"Für meinen Liebling."',
            emoji: '🍳',
            hint: 'Für den Herrn des Hauses',
            solution: 'FÜR MEINEN HERRN',
            reward: ITEMS['u2_p5'].name,
            rewardDe: ITEMS['u2_p5'].nameDe,
            rewardEmoji: ITEMS['u2_p5'].emoji,
            isFinal: false,
            question: 'Für wen ist das Frühstück?',
            storyIntro: '🍳 "Für meinen Liebling."\n\nAber das Frühstück ist nicht für dich.\n\nFür wen dann?',
            storyOutro: '✨ "Für meinen Herrn... richtig!"\n\nEs gibt noch jemanden in diesem Haus.'
          },
          {
            id: 'u2_p6',
            title: '📸 Foto',
            description: 'Eine weiße Katze und ein alter Mann. Rückseite: "Meine einzige Familie."',
            emoji: '📸',
            hint: 'Die weiße Katze',
            solution: 'DIE WEISSE KATZE',
            reward: ITEMS['u2_p6'].name,
            rewardDe: ITEMS['u2_p6'].nameDe,
            rewardEmoji: ITEMS['u2_p6'].emoji,
            isFinal: true,
            question: 'Wer bist du?',
            storyIntro: '📸 Eine weiße Katze und ein alter Mann.\n\nRückseite: "Meine einzige Familie."\n\nMoment... diese Katze...',
            storyOutro: '✨ "Die weiße Katze... richtig!"\n\nDu siehst deine Hände an... Sie sind pelzig.'
          }
        ],
        items: []
      },
      {
        id: 'room_2_3',
        name: '🌿 Garten',
        description: 'Hohe Mauern. Nasse Pfotenabdrücke am Pool.',
        color: '#2A6B3A',
        story: '🌿 Dritte Szene: Das Geheimnis des Gartens\n\nHohe Mauern. Du kannst nicht entkommen.\n\nNasse Pfotenabdrücke... dann verschwinden sie.',
        puzzles: [
          {
            id: 'u2_p7',
            title: '📓 Tagebuch',
            description: '"Ich bereue, was ich getan habe."',
            emoji: '📓',
            hint: 'Vergiftung der Katze',
            solution: 'DIE KATZE VERGIFTET',
            reward: ITEMS['u2_p7'].name,
            rewardDe: ITEMS['u2_p7'].nameDe,
            rewardEmoji: ITEMS['u2_p7'].emoji,
            isFinal: false,
            question: 'Was bereut der Besitzer?',
            storyIntro: '📓 "Ich bereue, was ich getan habe."\n\nWas hat er getan?',
            storyOutro: '✨ "Die Katze vergiftet... richtig!"\n\nDer Kaffee wurde absichtlich auf den Boden gestellt.'
          },
          {
            id: 'u2_p8',
            title: '💊 Leere Flasche',
            description: '"Für meine Katze. Gegen Vergiftung." Leer.',
            emoji: '💊',
            hint: 'Zu spät',
            solution: 'ZU SPÄT',
            reward: ITEMS['u2_p8'].name,
            rewardDe: ITEMS['u2_p8'].nameDe,
            rewardEmoji: ITEMS['u2_p8'].emoji,
            isFinal: false,
            question: 'Was passierte?',
            storyIntro: '💊 "Für meine Katze. Gegen Vergiftung."\n\nAber die Flasche ist leer.\n\nEr versuchte dich zu retten, aber...',
            storyOutro: '✨ "Zu spät... richtig!"\n\nDu schließt deine Augen.'
          },
          {
            id: 'u2_p9',
            title: '🚪 Die letzte Tür',
            description: 'Finde heraus, wer du bist und warum du hier bist.',
            emoji: '🚪',
            hint: 'Eine Katze, Kaffee',
            solution: 'EINE KATZE KAFFEE',
            reward: ITEMS['u2_p9'].name,
            rewardDe: ITEMS['u2_p9'].nameDe,
            rewardEmoji: ITEMS['u2_p9'].emoji,
            isFinal: true,
            question: 'Gib die finale Antwort ein:',
            storyIntro: '🚪 "Wer bist du? Warum bist du hier?"',
            storyOutro: '✨ "Eine Katze... Kaffee... richtig!"\n\nDie Tür öffnet sich. Blendendes Licht.\n\nDu verstehst endlich alles.\n\nDu bist eine Katze. Eine weiße Katze.\n\nDer Kaffee wurde versehentlich auf den Boden gestellt.\n\nDu lecktest daran.\n\nKatzen können Koffein nicht verstoffwechseln. Wenige Minuten später brachst du zusammen.\n\nDein Herz hörte auf zu schlagen.\n\nNiemand fand dich.\n\nBis zum nächsten Morgen... aber da war es zu spät.\n\n🌙 Du erwachst in deinem Katzenbett.\n\nEin neuer Tag. Die Sonne scheint. Der Kaffee steht noch auf dem Tisch.\n\nWar das ein Traum? Oder... eine Wiedergeburt?\n\n🏆 Ende Du starbst, aber du wachst wieder auf.'
          }
        ],
        items: []
      }
    ]
  }
];

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [unitsProgress, setUnitsProgress] = useState({
    unit_1: { completedRooms: [], completed: false, totalItems: 0, solvedPuzzles: [] },
    unit_2: { completedRooms: [], completed: false, totalItems: 0, solvedPuzzles: [] }
  });
  const [inventory, setInventory] = useState([]);
  const [hasWatchedHidden1, setHasWatchedHidden1] = useState(false);
  const [hasWatchedHidden2, setHasWatchedHidden2] = useState(false);

  const updateProgress = (roomId, puzzleId, unitId) => {
    const item = ITEMS[puzzleId];
    if (item && !inventory.some(i => i.id === puzzleId)) {
      setInventory(prev => [...prev, { id: puzzleId, name: item.name, nameDe: item.nameDe, emoji: item.emoji }]);
      setUnitsProgress(prev => ({
        ...prev,
        [unitId]: {
          ...prev[unitId],
          totalItems: prev[unitId].totalItems + 1,
          solvedPuzzles: [...prev[unitId].solvedPuzzles, puzzleId]
        }
      }));
    } else {
      setUnitsProgress(prev => ({
        ...prev,
        [unitId]: {
          ...prev[unitId],
          solvedPuzzles: [...prev[unitId].solvedPuzzles, puzzleId]
        }
      }));
    }

    const unit = UNITS.find(u => u.id === unitId);
    const room = unit.rooms.find(r => r.id === roomId);
    const currentProgress = unitsProgress[unitId];
    const allPuzzlesSolved = room.puzzles.every(p => 
      currentProgress.solvedPuzzles.includes(p.id) || p.id === puzzleId
    );
    
    if (allPuzzlesSolved) {
      setUnitsProgress(prev => {
        const completedRooms = [...prev[unitId].completedRooms];
        if (!completedRooms.includes(roomId)) {
          completedRooms.push(roomId);
        }
        const allRoomsCompleted = completedRooms.length === unit.rooms.length;
        return {
          ...prev,
          [unitId]: {
            ...prev[unitId],
            completedRooms,
            completed: allRoomsCompleted
          }
        };
      });
    }
  };

  const isPuzzleSolved = (puzzleId, unitId) => {
    return unitsProgress[unitId]?.solvedPuzzles.includes(puzzleId) || false;
  };
  
  const isRoomComplete = (roomId, unitId) => {
    return unitsProgress[unitId]?.completedRooms.includes(roomId) || false;
  };
  
  const isUnitCompleted = (unitId) => {
    return unitsProgress[unitId]?.completed || false;
  };
  
  const getUnitItems = (unitId) => unitsProgress[unitId]?.totalItems || 0;
  const completedCount = Object.values(unitsProgress).filter(u => u.completed).length;

  const getTotalItems = () => {
    return inventory.length;
  };

  const useHint = () => {
    if (getTotalItems() >= 5) {
      const newInventory = [...inventory];
      for (let i = 0; i < 5 && newInventory.length > 0; i++) {
        newInventory.pop();
      }
      setInventory(newInventory);
      setUnitsProgress(prev => ({
        unit_1: { ...prev.unit_1, totalItems: Math.max(0, prev.unit_1.totalItems - 5) },
        unit_2: { ...prev.unit_2, totalItems: Math.max(0, prev.unit_2.totalItems - 5) }
      }));
      return true;
    }
    return false;
  };

  return (
    <GameContext.Provider value={{
      inventory, updateProgress, isPuzzleSolved, isRoomComplete, isUnitCompleted, getUnitItems, completedCount,
      unitsProgress, getTotalItems, useHint,
      hasWatchedHidden1, setHasWatchedHidden1,
      hasWatchedHidden2, setHasWatchedHidden2
    }}>
      {children}
    </GameContext.Provider>
  );
};

const useGame = () => useContext(GameContext);

const CoverScreen = ({ onStart }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={{ alignItems: 'center', paddingHorizontal: 30 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>
          Willkommen bei „Escape Room“
        </Text>
        <Text style={{ color: '#AAAAAA', fontSize: 18, fontStyle: 'italic', marginBottom: 60 }}>
          Deutsche Fassung
        </Text>
        <TouchableOpacity
          onPress={onStart}
          style={{ backgroundColor: accentColor, paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30, flexDirection: 'row', alignItems: 'center' }}
        >
          <MaterialIcons name="play-arrow" size={28} color="#FFFFFF" />
          <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginLeft: 8 }}>START</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PuzzleModal = ({ visible, puzzle, roomId, onClose, onSolve, insetsTop, insetsBottom, unitId }) => {
  const [input, setInput] = useState('');
  const [shaking, setShaking] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showOutro, setShowOutro] = useState(false);
  const game = useGame();

  // ---------- AI 德語老師 (LanguageTool) ----------
  const [teacherInput, setTeacherInput] = useState('');
  const [teacherResponse, setTeacherResponse] = useState('');
  const [teacherLoading, setTeacherLoading] = useState(false);

  const checkGermanGrammar = async () => {
    if (!teacherInput.trim()) return;
    setTeacherLoading(true);
    setTeacherResponse('');
    try {
      const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `text=${encodeURIComponent(teacherInput)}&language=de`
      });
      const data = await response.json();
      if (data.matches.length === 0) {
        setTeacherResponse('✅ 文法正確！\n\nDein Satz ist grammatikalisch korrekt.');
      } else {
        let result = '🔍 找到以下問題：\n\n';
        data.matches.forEach((match, idx) => {
          result += `${idx + 1}. ${match.message}\n`;
          result += `   ❌ 錯誤部分：${match.context.text.substring(match.context.offset, match.context.offset + match.context.length)}\n`;
          if (match.replacements && match.replacements.length > 0) {
            result += `   ✅ 建議修正：${match.replacements[0].value}\n`;
          }
          result += '\n';
        });
        setTeacherResponse(result);
      }
    } catch (error) {
      setTeacherResponse('❌ 連線錯誤：' + error.message);
    }
    setTeacherLoading(false);
  };

  useEffect(() => {
    if (!visible) {
      setInput('');
      setShaking(false);
      setSuccess(false);
      setShowIntro(true);
      setShowOutro(false);
    }
  }, [visible]);

  if (!puzzle) return null;

  const handleSubmit = () => {
    if (input.trim().toUpperCase() === puzzle.solution.toUpperCase()) {
      setSuccess(true);
      setShowOutro(true);
      setTimeout(() => {
        onSolve(puzzle.id, unitId);
        onClose();
      }, 3000);
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  const handleUseHint = () => {
    if (game.useHint()) {
      Alert.alert('🔮 Hinweis', puzzle.hint);
    } else {
      Alert.alert('❌ Nicht genug Gegenstände', `Du brauchst 5 Gegenstände für einen Hinweis. Aktuell: ${game.getTotalItems()}/5`);
    }
  };

  const hasFreeHint = puzzle.id === 'u1_p2';

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.85)', marginTop: insetsTop }}>
        <View style={{ backgroundColor: cardColor, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: insetsBottom + 24, borderTopWidth: 2, borderColor: accentColor, maxHeight: '85%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ color: accentColor, fontSize: 12, fontWeight: 'bold' }}>🔓 Rätsel</Text>
            <TouchableOpacity onPress={onClose}><MaterialIcons name="close" size={24} color={textSecondary} /></TouchableOpacity>
          </View>

          {showIntro ? (
            <ScrollView>
              <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                <Text style={{ fontSize: 48, marginBottom: 16 }}>{puzzle.emoji}</Text>
                <Text style={{ color: textPrimary, fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>{puzzle.title}</Text>
                <View style={{ backgroundColor: cardColorAlt, borderRadius: 12, padding: 20, marginBottom: 20 }}>
                  <Text style={{ color: textPrimary, fontSize: 15, lineHeight: 24 }}>{puzzle.storyIntro}</Text>
                </View>
                <TouchableOpacity onPress={() => setShowIntro(false)} style={{ backgroundColor: accentColor, borderRadius: 10, paddingHorizontal: 30, paddingVertical: 14, width: '80%' }}>
                  <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>Start →</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          ) : showOutro ? (
            <ScrollView>
              <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                <Text style={{ fontSize: 48, marginBottom: 16 }}>✨</Text>
                <Text style={{ color: successColor, fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>Richtig! 🎉</Text>
                <View style={{ backgroundColor: successColor + '15', borderRadius: 12, padding: 20, marginBottom: 20 }}>
                  <Text style={{ color: textPrimary, fontSize: 15, lineHeight: 24 }}>{puzzle.storyOutro}</Text>
                </View>
                <Text style={{ color: textSecondary, fontSize: 14 }}>Erhalten: {puzzle.rewardEmoji} {puzzle.reward}</Text>
              </View>
            </ScrollView>
          ) : (
            <ScrollView>
              <Text style={{ color: textPrimary, fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>{puzzle.title}</Text>
              <View style={{ backgroundColor: cardColorAlt, borderRadius: 12, padding: 16, marginBottom: 16 }}>
                <Text style={{ color: textSecondary, fontSize: 13 }}>{puzzle.description}</Text>
              </View>
              <View style={{ borderWidth: shaking ? 2 : 1, borderColor: shaking ? accentColor : borderColor, borderRadius: 10, backgroundColor: primaryColor, marginBottom: 12, paddingHorizontal: 12 }}>
                <TextInput value={input} onChangeText={setInput} placeholder="Antwort eingeben..." placeholderTextColor={textSecondary} style={{ color: textPrimary, fontSize: 16, paddingVertical: 14 }} autoCapitalize="characters" autoCorrect={false} onSubmitEditing={handleSubmit} />
              </View>
              <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: accentColor, borderRadius: 10, padding: 15, alignItems: 'center', marginBottom: 12 }}>
                <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>🔓 Prüfen</Text>
              </TouchableOpacity>
              {hasFreeHint ? (
                <View style={{ backgroundColor: accentColor + '20', borderRadius: 10, padding: 12, alignItems: 'center' }}>
                  <Text style={{ color: accentColor, fontSize: 13 }}>💡 Kostenloser Hinweis: Daily my life → Latein</Text>
                </View>
              ) : (
                <TouchableOpacity onPress={handleUseHint} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                  <MaterialIcons name="lightbulb-outline" size={16} color={warningColor} />
                  <Text style={{ color: warningColor, fontSize: 13, marginLeft: 6 }}>🔮 Hinweis (5 Gegenstände) - Aktuell: {game.getTotalItems()}/5</Text>
                </TouchableOpacity>
              )}

              {/* ---------- AI 德語老師 ---------- */}
              <View style={{ marginTop: 16, borderTopWidth: 1, borderTopColor: borderColor, paddingTop: 16 }}>
                <Text style={{ color: textSecondary, fontSize: 12, marginBottom: 8 }}>📝 德語老師（輸入德語句子，AI 檢查文法）</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TextInput
                    value={teacherInput}
                    onChangeText={setTeacherInput}
                    placeholder="輸入德語句子..."
                    placeholderTextColor={textSecondary}
                    style={{ flex: 1, backgroundColor: primaryColor, borderRadius: 10, padding: 12, color: textPrimary, fontSize: 14, marginRight: 8, borderWidth: 1, borderColor: borderColor }}
                    onSubmitEditing={checkGermanGrammar}
                  />
                  <TouchableOpacity
                    onPress={checkGermanGrammar}
                    disabled={teacherLoading}
                    style={{ backgroundColor: accentColor, borderRadius: 10, padding: 12, alignItems: 'center', justifyContent: 'center', minWidth: 60, opacity: teacherLoading ? 0.5 : 1 }}
                  >
                    <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{teacherLoading ? '...' : '檢查'}</Text>
                  </TouchableOpacity>
                </View>
                {teacherResponse ? (
                  <View style={{ backgroundColor: cardColorAlt, borderRadius: 10, padding: 12, marginTop: 10 }}>
                    <Text style={{ color: textPrimary, fontSize: 14, lineHeight: 20 }}>{teacherResponse}</Text>
                  </View>
                ) : null}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

const RoomScreen = ({ navigation, route }) => {
  const { unitId, roomId } = route.params;
  const insets = useSafeAreaInsets();
  const game = useGame();
  const unit = UNITS.find(u => u.id === unitId);
  const room = unit?.rooms?.find(r => r.id === roomId);
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
  const [showVictory, setShowVictory] = useState(false);
  const [showRoomStory, setShowRoomStory] = useState(true);

  const getSolvedCount = () => {
    if (!room) return 0;
    return room.puzzles.filter(p => game.isPuzzleSolved(p.id, unitId)).length;
  };
  
  const solvedCount = getSolvedCount();
  const roomComplete = game.isRoomComplete(roomId, unitId);

  const handleSolvePuzzle = (puzzleId, unitId) => {
    game.updateProgress(roomId, puzzleId, unitId);
  };

  useEffect(() => {
    if (roomComplete && !showVictory) {
      setShowVictory(true);
    }
  }, [roomComplete]);

  if (!room) return null;

  const currentRoomIndex = unit.rooms.findIndex(r => r.id === roomId);
  const nextRoom = unit.rooms[currentRoomIndex + 1];

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <View style={{ height: 60 + insets.top, paddingTop: insets.top, backgroundColor: room.color, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}><MaterialIcons name="arrow-back" size={24} color={textPrimary} /></TouchableOpacity>
        <Text style={{ fontSize: 26, marginRight: 10 }}>{room.name.charAt(0)}</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ color: textPrimary, fontSize: 16, fontWeight: 'bold' }}>{room.name}</Text>
          <Text style={{ color: textSecondary, fontSize: 12 }}>Rätsel</Text>
        </View>
        {roomComplete && <View style={{ backgroundColor: successColor + '30', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 }}><Text style={{ color: successColor, fontSize: 11, fontWeight: 'bold' }}>✅ Gelöst</Text></View>}
      </View>

      <Modal visible={showRoomStory && !roomComplete} transparent onRequestClose={() => setShowRoomStory(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.92)', padding: 24 }}>
          <View style={{ backgroundColor: cardColor, borderRadius: 20, padding: 24, borderWidth: 2, borderColor: accentColor, maxWidth: Dimensions.get('window').width - 48 }}>
            <Text style={{ fontSize: 48, textAlign: 'center', marginBottom: 16 }}>{room.name.charAt(0)}</Text>
            <Text style={{ color: textPrimary, fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>{room.name}</Text>
            <Text style={{ color: textSecondary, fontSize: 14, lineHeight: 22, marginBottom: 24 }}>{room.story}</Text>
            <TouchableOpacity onPress={() => setShowRoomStory(false)} style={{ backgroundColor: accentColor, borderRadius: 12, padding: 14, alignItems: 'center' }}>
              <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>Start →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 20 }}>
        <View style={{ backgroundColor: cardColor, borderRadius: 14, padding: 16, marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text style={{ color: textSecondary, fontSize: 11 }}>📊 Fortschritt</Text>
            <Text style={{ color: accentColor, fontSize: 13, fontWeight: 'bold' }}>{solvedCount}/{room.puzzles.length}</Text>
          </View>
          <View style={{ height: 8, backgroundColor: primaryColor, borderRadius: 4, overflow: 'hidden' }}>
            <View style={{ height: 8, width: `${(solvedCount / room.puzzles.length) * 100}%`, backgroundColor: solvedCount === room.puzzles.length ? successColor : accentColor, borderRadius: 4 }} />
          </View>
        </View>

        <Text style={{ color: textSecondary, fontSize: 11, marginBottom: 10 }}>🔍 Rätsel</Text>
        {room.puzzles.map(puzzle => {
          const solved = game.isPuzzleSolved(puzzle.id, unitId);
          return (
            <TouchableOpacity key={puzzle.id} onPress={() => setSelectedPuzzle(puzzle)} style={{ backgroundColor: solved ? successColor + '15' : cardColorAlt, borderRadius: 12, padding: 16, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: solved ? successColor + '30' : accentColor + '20', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
                <Text style={{ fontSize: 18 }}>{solved ? '✅' : puzzle.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: solved ? successColor : textPrimary, fontSize: 15, fontWeight: '600', marginBottom: 3 }}>{puzzle.title}</Text>
                <Text style={{ color: textSecondary, fontSize: 12 }}>{solved ? 'Gelöst' : 'Ungelöst'}</Text>
              </View>
              <MaterialIcons name={solved ? 'check-circle' : 'chevron-right'} size={22} color={solved ? successColor : textSecondary} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <PuzzleModal visible={selectedPuzzle !== null} puzzle={selectedPuzzle} roomId={room.id} onClose={() => setSelectedPuzzle(null)} onSolve={handleSolvePuzzle} insetsTop={insets.top} insetsBottom={insets.bottom} unitId={unitId} />

      <Modal visible={showVictory} transparent onRequestClose={() => setShowVictory(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.95)', padding: 24 }}>
          <View style={{ backgroundColor: cardColor, borderRadius: 20, padding: 32, borderWidth: 2, borderColor: successColor, alignItems: 'center', width: Dimensions.get('window').width - 48 }}>
            <Text style={{ fontSize: 72, marginBottom: 12 }}>🏆</Text>
            <Text style={{ color: successColor, fontSize: 28, fontWeight: 'bold', marginBottom: 8 }}>Zimmer gelöst!</Text>
            <Text style={{ color: textPrimary, fontSize: 18, marginBottom: 6 }}>{room.name}</Text>
            <Text style={{ color: textSecondary, fontSize: 15, marginBottom: 32 }}>Geschafft! 🎉</Text>
            
            {nextRoom ? (
              <TouchableOpacity 
                onPress={() => { setShowVictory(false); navigation.replace('Room', { unitId, roomId: nextRoom.id }); }} 
                style={{ backgroundColor: successColor, borderRadius: 16, paddingVertical: 18, paddingHorizontal: 20, width: '100%', alignItems: 'center', marginBottom: 12, borderWidth: 2, borderColor: '#FFFFFF' }}
              >
                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>➡️ 前往下一關</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                onPress={() => { setShowVictory(false); navigation.goBack(); }} 
                style={{ backgroundColor: successColor, borderRadius: 16, paddingVertical: 18, paddingHorizontal: 20, width: '100%', alignItems: 'center', borderWidth: 2, borderColor: '#FFFFFF' }}
              >
                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20 }}>🚪 返回主頁</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const game = useGame();

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <View style={{ height: 60 + insets.top, paddingTop: insets.top, backgroundColor: primaryColor, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: textSecondary, fontSize: 11 }}>🔐 Deutsch lernen</Text>
          <Text style={{ color: textPrimary, fontSize: 22, fontWeight: 'bold' }}>Escape Room</Text>
        </View>
        <View style={{ alignItems: 'center', backgroundColor: accentColor + '20', borderRadius: 12, padding: 10 }}>
          <Text style={{ color: accentColor, fontSize: 18, fontWeight: 'bold' }}>{game.completedCount}/{UNITS.length}</Text>
          <Text style={{ color: textSecondary, fontSize: 10 }}>Einheiten</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 90 }}>
        <View style={{ backgroundColor: cardColorAlt, borderRadius: 12, padding: 12, marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: textPrimary, fontSize: 14 }}>🎒 Gegenstände: {game.getTotalItems()}/15</Text>
          {game.getTotalItems() >= 5 && <Text style={{ color: warningColor, fontSize: 12 }}>🔮 5 = Hinweis</Text>}
          {game.getTotalItems() >= 15 && <Text style={{ color: successColor, fontSize: 12 }}>🎭 15 = Versteckte Szene</Text>}
        </View>

        {UNITS.map((unit, idx) => {
          const isUnlocked = unit.unlocked || game.isUnitCompleted('unit_1');
          let completedRooms = 0;
          if (unit.rooms) {
            completedRooms = unit.rooms.filter(room => game.isRoomComplete(room.id, unit.id)).length;
          }
          const totalRooms = unit.rooms?.length || 0;

          return (
            <TouchableOpacity key={unit.id} onPress={() => {
              if (unit.id === 'unit_1' || game.isUnitCompleted('unit_1')) {
                if (unit.rooms && unit.rooms.length > 0) {
                  navigation.push('Room', { unitId: unit.id, roomId: unit.rooms[0].id });
                } else {
                  Alert.alert('🔒 Bald verfügbar', 'Zweite Einheit kommt bald!');
                }
              } else {
                Alert.alert('🔒 Gesperrt', 'Schließe zuerst die erste Einheit ab!');
              }
            }} style={{ backgroundColor: unit.bgColor, borderRadius: 16, marginBottom: 14, overflow: 'hidden' }}>
              <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 42, marginRight: 16 }}>{unit.name}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: unit.textColor, fontSize: 18, fontWeight: 'bold' }}>{unit.title}</Text>
                  <Text style={{ color: unit.textColor + 'CC', fontSize: 12 }}>{unit.subtitle}</Text>
                </View>
                {!game.isUnitCompleted('unit_1') && unit.id === 'unit_2' && <MaterialIcons name="lock" size={24} color={unit.textColor} />}
                {game.isUnitCompleted(unit.id) && <Text style={{ color: successColor, fontSize: 22 }}>✅</Text>}
              </View>
              <View style={{ padding: 16, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <Text style={{ color: unit.textColor, fontSize: 13, marginBottom: 8 }}>
                  {unit.id === 'unit_1' ? `Fortschritt: ${completedRooms}/${totalRooms} Räume` : (game.isUnitCompleted('unit_1') ? '🔓 Verfügbar' : '🔒 Schließe zuerst die erste Einheit ab')}
                </Text>
                {unit.id === 'unit_1' && totalRooms > 0 && (
                  <View style={{ height: 4, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 2, overflow: 'hidden' }}>
                    <View style={{ height: 4, width: `${(completedRooms / totalRooms) * 100}%`, backgroundColor: successColor, borderRadius: 2 }} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const InventoryScreen = () => {
  const insets = useSafeAreaInsets();
  const game = useGame();
  const [showHidden1, setShowHidden1] = useState(false);
  const [showHidden2, setShowHidden2] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <View style={{ height: 60 + insets.top, paddingTop: insets.top, backgroundColor: primaryColor, justifyContent: 'center', paddingHorizontal: 20 }}>
        <Text style={{ color: textSecondary, fontSize: 11 }}>🎒 Inventar</Text>
        <Text style={{ color: textPrimary, fontSize: 22, fontWeight: 'bold' }}>Gegenstände</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 90 }}>
        {game.inventory.length === 0 ? (
          <View style={{ alignItems: 'center', paddingTop: 80 }}>
            <Text style={{ fontSize: 72, marginBottom: 16 }}>🎒</Text>
            <Text style={{ color: textPrimary, fontSize: 20, fontWeight: 'bold' }}>Leer</Text>
            <Text style={{ color: textSecondary, fontSize: 14 }}>Löse Rätsel, um Gegenstände zu sammeln!</Text>
          </View>
        ) : (
          <View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 }}>
              {game.inventory.map((item, idx) => (
                <View key={idx} style={{ backgroundColor: cardColor, borderRadius: 14, padding: 16, marginRight: 12, marginBottom: 12, borderWidth: 1, borderColor: successColor + '40', alignItems: 'center', minWidth: 100 }}>
                  <Text style={{ fontSize: 36, marginBottom: 8 }}>{item.emoji}</Text>
                  <Text style={{ color: successColor, fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>{item.name}</Text>
                  <Text style={{ color: textSecondary, fontSize: 10, marginTop: 4 }}>{item.nameDe}</Text>
                </View>
              ))}
            </View>
            
            {game.getTotalItems() >= 15 && !game.hasWatchedHidden1 && (
              <TouchableOpacity 
                onPress={() => setShowHidden1(true)} 
                style={{ backgroundColor: successColor, borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 12 }}
              >
                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>🎭 Versteckte Szene - Einheit 1</Text>
              </TouchableOpacity>
            )}
            
            {game.getTotalItems() >= 15 && !game.hasWatchedHidden2 && (
              <TouchableOpacity 
                onPress={() => setShowHidden2(true)} 
                style={{ backgroundColor: successColor, borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 12 }}
              >
                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>🎭 Versteckte Szene - Einheit 2</Text>
              </TouchableOpacity>
            )}
            
            <View style={{ backgroundColor: cardColorAlt, borderRadius: 12, padding: 16, marginTop: 8 }}>
              <Text style={{ color: textPrimary, fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>🎁 Austauschsystem</Text>
              <Text style={{ color: textSecondary, fontSize: 12, marginBottom: 4 }}>• 5 Gegenstände → Hinweis (im Rätsel verfügbar)</Text>
              <Text style={{ color: textSecondary, fontSize: 12 }}>• 15 Gegenstände → Versteckte Szene</Text>
              <Text style={{ color: accentColor, fontSize: 12, marginTop: 8 }}>Aktuell: {game.getTotalItems()}/15</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <Modal visible={showHidden1} transparent onRequestClose={() => setShowHidden1(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.95)', padding: 24 }}>
          <View style={{ backgroundColor: cardColor, borderRadius: 20, padding: 24, borderWidth: 2, borderColor: successColor, maxWidth: Dimensions.get('window').width - 48 }}>
            <Text style={{ fontSize: 48, textAlign: 'center', marginBottom: 16 }}>🎭</Text>
            <Text style={{ color: successColor, fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>Versteckte Szene - Einheit 1</Text>
            <Text style={{ color: textPrimary, fontSize: 15, lineHeight: 24, marginBottom: 24 }}>
              {`🎭 Das Geständnis von Herrn Kern\n\n"Ich bin Herr Kern. Du denkst vielleicht, ich bin der Bösewicht...\n\nAber in Wirklichkeit habe ich Anna beschützt. Sie war von einer gefährlichen Gruppe bedroht.\n\nIch hatte Angst, es ihr zu sagen. An dem Tag... wollte ich ihr endlich die Wahrheit sagen.\n\nAber ich kam zu spät.\n\nWenn du sie findest, sag ihr bitte: Der Lehrer ist kein Bösewicht."`}
            </Text>
            <TouchableOpacity 
              onPress={() => { setShowHidden1(false); game.setHasWatchedHidden1(true); }} 
              style={{ backgroundColor: successColor, borderRadius: 12, padding: 14, alignItems: 'center' }}
            >
              <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>Schließen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showHidden2} transparent onRequestClose={() => setShowHidden2(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.95)', padding: 24 }}>
          <View style={{ backgroundColor: cardColor, borderRadius: 20, padding: 24, borderWidth: 2, borderColor: successColor, maxWidth: Dimensions.get('window').width - 48 }}>
            <Text style={{ fontSize: 48, textAlign: 'center', marginBottom: 16 }}>🎭</Text>
            <Text style={{ color: successColor, fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>Versteckte Szene - Einheit 2</Text>
            <Text style={{ color: textPrimary, fontSize: 15, lineHeight: 24, marginBottom: 24 }}>
              {`🎭 Der wahre Besitzer\n\n"Ich bin der Besitzer dieses Hauses. Die weiße Katze... war meine einzige Familie.\n\nDer Arzt sagte mir, dass ich nicht mehr lange leben würde. Meine größte Sorge war, was mit ihr passieren würde.\n\nAn dem Tag stellte ich den Kaffee auf den Boden, um zu sehen, ob sie...\n\nIch habe es sofort bereut.\n\nWenn du das siehst... bitte pass auf sie auf."`}
            </Text>
            <TouchableOpacity 
              onPress={() => { setShowHidden2(false); game.setHasWatchedHidden2(true); }} 
              style={{ backgroundColor: successColor, borderRadius: 12, padding: 14, alignItems: 'center' }}
            >
              <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>Schließen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ProgressScreen = () => {
  const insets = useSafeAreaInsets();
  const game = useGame();
  
  let totalPuzzles = 0;
  let solvedPuzzles = 0;
  UNITS.forEach(unit => {
    if (unit.rooms) {
      unit.rooms.forEach(room => {
        room.puzzles.forEach(puzzle => {
          totalPuzzles++;
          if (game.isPuzzleSolved(puzzle.id, unit.id)) solvedPuzzles++;
        });
      });
    }
  });

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <View style={{ height: 60 + insets.top, paddingTop: insets.top, backgroundColor: primaryColor, justifyContent: 'center', paddingHorizontal: 20 }}>
        <Text style={{ color: textSecondary, fontSize: 11 }}>📈 Statistik</Text>
        <Text style={{ color: textPrimary, fontSize: 22, fontWeight: 'bold' }}>Fortschritt</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 90 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 }}>
          <View style={{ backgroundColor: accentColor + '20', borderRadius: 14, padding: 16, flex: 1, marginRight: 8, marginBottom: 8, alignItems: 'center' }}>
            <Text style={{ fontSize: 32, marginBottom: 4 }}>📚</Text>
            <Text style={{ color: accentColor, fontSize: 28, fontWeight: 'bold' }}>{game.completedCount}/{UNITS.length}</Text>
            <Text style={{ color: textSecondary, fontSize: 12 }}>Einheiten</Text>
          </View>
          <View style={{ backgroundColor: successColor + '15', borderRadius: 14, padding: 16, flex: 1, marginBottom: 8, alignItems: 'center' }}>
            <Text style={{ fontSize: 32, marginBottom: 4 }}>🧩</Text>
            <Text style={{ color: successColor, fontSize: 28, fontWeight: 'bold' }}>{solvedPuzzles}/{totalPuzzles}</Text>
            <Text style={{ color: textSecondary, fontSize: 12 }}>Rätsel</Text>
          </View>
          <View style={{ backgroundColor: warningColor + '15', borderRadius: 14, padding: 16, flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 32, marginBottom: 4 }}>🎒</Text>
            <Text style={{ color: warningColor, fontSize: 28, fontWeight: 'bold' }}>{game.inventory.length}</Text>
            <Text style={{ color: textSecondary, fontSize: 12 }}>Gegenstände</Text>
          </View>
        </View>
        
        <View style={{ backgroundColor: cardColorAlt, borderRadius: 12, padding: 16 }}>
          <Text style={{ color: textPrimary, fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>🎁 Erfolge</Text>
          <Text style={{ color: game.getTotalItems() >= 5 ? successColor : textSecondary, fontSize: 12, marginBottom: 4 }}>
            {game.getTotalItems() >= 5 ? '✅' : '🔒'} 5 Gegenstände → Hinweis freigeschaltet
          </Text>
          <Text style={{ color: game.getTotalItems() >= 15 ? successColor : textSecondary, fontSize: 12 }}>
            {game.getTotalItems() >= 15 ? '✅' : '🔒'} 15 Gegenstände → Versteckte Szene freigeschaltet
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const TabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: cardColor, borderTopColor: borderColor }, tabBarActiveTintColor: accentColor, tabBarInactiveTintColor: textSecondary }}>
    <Tab.Screen name="Räume" component={HomeScreen} options={{ tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} /> }} />
    <Tab.Screen name="Inventar" component={InventoryScreen} options={{ tabBarIcon: ({ color }) => <MaterialIcons name="backpack" size={24} color={color} /> }} />
    <Tab.Screen name="Fortschritt" component={ProgressScreen} options={{ tabBarIcon: ({ color }) => <MaterialIcons name="emoji-events" size={24} color={color} /> }} />
  </Tab.Navigator>
);

const MainNavigator = () => {
  const [showCover, setShowCover] = useState(true);

  if (showCover) {
    return <CoverScreen onStart={() => setShowCover(false)} />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Room" component={RoomScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <GameProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </GameProvider>
    </SafeAreaProvider>
  );
}