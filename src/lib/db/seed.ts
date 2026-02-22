import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { answers, categories, questions } from './schema';

const client = createClient({ url: 'file:local.db' });
const db = drizzle(client);

type SeedQuestion = {
  category: string;
  difficulty: number;
  questionText: string;
  codeSnippet: string | null;
  explanation: string;
  answers: { text: string; isCorrect: boolean }[];
};

const seedCategories = [
  {
    name: 'POO Java',
    slug: 'poo-java',
    description: 'Programmation Orientée Objet en Java',
  },
  {
    name: 'POO PHP',
    slug: 'poo-php',
    description: 'Programmation Orientée Objet en PHP',
  },
];

const seedQuestions: SeedQuestion[] = [
  // ================================================
  // POO Java — Facile (difficulté: 1, théorique)
  // ================================================
  {
    category: 'poo-java',
    difficulty: 1,
    questionText: "Quel principe de la POO permet de cacher les détails d'implémentation ?",
    codeSnippet: null,
    explanation:
      "L'encapsulation permet de cacher les détails d'implémentation en rendant les attributs privés et en exposant des méthodes publiques (getters/setters) pour y accéder.",
    answers: [
      { text: "L'encapsulation", isCorrect: true },
      { text: 'Le polymorphisme', isCorrect: false },
      { text: "L'héritage", isCorrect: false },
      { text: "L'abstraction", isCorrect: false },
    ],
  },
  {
    category: 'poo-java',
    difficulty: 1,
    questionText: 'Quelle est la différence entre une classe abstraite et une interface en Java ?',
    codeSnippet: null,
    explanation:
      "Une classe abstraite peut contenir des méthodes concrètes et des attributs, tandis qu'une interface (avant Java 8) ne contenait que des signatures de méthodes. Depuis Java 8, les interfaces peuvent avoir des méthodes par défaut, mais une classe ne peut hériter que d'une seule classe abstraite alors qu'elle peut implémenter plusieurs interfaces.",
    answers: [
      {
        text: 'Une classe abstraite peut avoir des méthodes concrètes, une interface non (avant Java 8)',
        isCorrect: true,
      },
      {
        text: "Une classe peut implémenter plusieurs interfaces mais hériter d'une seule classe abstraite",
        isCorrect: true,
      },
      {
        text: "Il n'y a aucune différence, les deux sont interchangeables",
        isCorrect: false,
      },
      {
        text: 'Une interface peut avoir des constructeurs',
        isCorrect: false,
      },
    ],
  },
  {
    category: 'poo-java',
    difficulty: 1,
    questionText: "Que signifie le mot-clé 'static' appliqué à une méthode en Java ?",
    codeSnippet: null,
    explanation:
      "Une méthode static appartient à la classe elle-même et non à une instance. Elle peut être appelée sans créer d'objet de la classe.",
    answers: [
      {
        text: 'La méthode appartient à la classe et non à une instance',
        isCorrect: true,
      },
      {
        text: 'La méthode ne peut pas être modifiée',
        isCorrect: false,
      },
      {
        text: 'La méthode est automatiquement synchronisée',
        isCorrect: false,
      },
      {
        text: 'La méthode ne peut pas retourner de valeur',
        isCorrect: false,
      },
    ],
  },
  {
    category: 'poo-java',
    difficulty: 1,
    questionText: 'Quels sont les 4 piliers de la Programmation Orientée Objet ?',
    codeSnippet: null,
    explanation:
      "Les 4 piliers de la POO sont : l'encapsulation (cacher les détails), l'héritage (réutiliser du code), le polymorphisme (traiter des objets différents de manière uniforme) et l'abstraction (simplifier la complexité).",
    answers: [
      { text: 'Encapsulation', isCorrect: true },
      { text: 'Héritage', isCorrect: true },
      { text: 'Polymorphisme', isCorrect: true },
      { text: 'Abstraction', isCorrect: true },
    ],
  },

  // ================================================
  // POO Java — Difficile (difficulté: 2, mélange)
  // ================================================
  {
    category: 'poo-java',
    difficulty: 2,
    questionText: "Quel est l'output de ce programme ?",
    codeSnippet: `public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.speak();
    }
}

class Animal {
    public void speak() {
        System.out.println("Animal speaks");
    }
}

class Dog extends Animal {
    @Override
    public void speak() {
        System.out.println("Dog barks");
    }
}`,
    explanation:
      "Le polymorphisme dynamique fait que la méthode de la classe réelle (Dog) est appelée, même si la référence est de type Animal. L'output est donc 'Dog barks'.",
    answers: [
      { text: 'Dog barks', isCorrect: true },
      { text: 'Animal speaks', isCorrect: false },
      { text: 'Erreur de compilation', isCorrect: false },
      { text: 'Animal speaks\nDog barks', isCorrect: false },
    ],
  },
  {
    category: 'poo-java',
    difficulty: 2,
    questionText:
      "En Java, quel modificateur d'accès permet à une sous-classe dans un autre package d'accéder à un membre ?",
    codeSnippet: null,
    explanation:
      "Le modificateur 'protected' permet l'accès depuis la même classe, le même package, et les sous-classes même dans d'autres packages. 'private' restreint à la classe, 'default' (pas de modificateur) au package, et 'public' est sans restriction.",
    answers: [
      { text: 'protected', isCorrect: true },
      { text: 'private', isCorrect: false },
      { text: 'default (pas de modificateur)', isCorrect: false },
      { text: 'internal', isCorrect: false },
    ],
  },
  {
    category: 'poo-java',
    difficulty: 2,
    questionText: "Quel est l'output de ce programme ?",
    codeSnippet: `public class Main {
    public static void main(String[] args) {
        String s1 = new String("hello");
        String s2 = new String("hello");
        System.out.println(s1 == s2);
        System.out.println(s1.equals(s2));
    }
}`,
    explanation:
      "L'opérateur == compare les références (adresses mémoire), pas les valeurs. Comme s1 et s2 sont deux objets distincts créés avec 'new', s1 == s2 retourne false. En revanche, .equals() compare le contenu des chaînes, donc s1.equals(s2) retourne true.",
    answers: [
      { text: 'false\ntrue', isCorrect: true },
      { text: 'true\ntrue', isCorrect: false },
      { text: 'false\nfalse', isCorrect: false },
      { text: 'true\nfalse', isCorrect: false },
    ],
  },

  // ================================================
  // POO Java — GOAT (difficulté: 3, code uniquement)
  // ================================================
  {
    category: 'poo-java',
    difficulty: 3,
    questionText: "Quel est l'output de ce programme ?",
    codeSnippet: `public class Main {
    public static void main(String[] args) {
        Base b = new Derived();
        System.out.println(b.x);
        b.display();
    }
}

class Base {
    int x = 10;
    public void display() {
        System.out.println("Base: " + x);
    }
}

class Derived extends Base {
    int x = 20;
    @Override
    public void display() {
        System.out.println("Derived: " + x);
    }
}`,
    explanation:
      "En Java, les attributs ne sont pas polymorphiques (pas de 'virtual' sur les champs). b.x accède à l'attribut de Base (10) car le type de la référence est Base. En revanche, b.display() appelle la méthode de Derived (polymorphisme dynamique), qui accède à son propre x (20).",
    answers: [
      { text: '10\nDerived: 20', isCorrect: true },
      { text: '20\nDerived: 20', isCorrect: false },
      { text: '10\nBase: 10', isCorrect: false },
      { text: 'Erreur de compilation', isCorrect: false },
    ],
  },
  {
    category: 'poo-java',
    difficulty: 3,
    questionText: "Quel est l'output de ce programme ?",
    codeSnippet: `public class Main {
    public static void main(String[] args) {
        try {
            throw new RuntimeException();
        } catch (Exception e) {
            System.out.print("catch ");
            throw new RuntimeException();
        } finally {
            System.out.print("finally ");
        }
        System.out.print("end");
    }
}`,
    explanation:
      "Le bloc catch s'exécute et affiche 'catch ', puis lance une nouvelle exception. Le bloc finally s'exécute toujours, même après une exception dans le catch, et affiche 'finally '. Mais comme l'exception du catch n'est pas rattrapée, 'end' n'est jamais atteint. Le programme affiche 'catch finally ' puis crash avec RuntimeException.",
    answers: [
      { text: 'catch finally (puis RuntimeException)', isCorrect: true },
      { text: 'catch end', isCorrect: false },
      { text: 'catch finally end', isCorrect: false },
      { text: 'catch (puis RuntimeException)', isCorrect: false },
    ],
  },
  {
    category: 'poo-java',
    difficulty: 3,
    questionText: "Quel est l'output de ce programme ?",
    codeSnippet: `public class Main {
    static int count = 0;

    public Main() {
        count++;
    }

    public static void main(String[] args) {
        Main a = new Main();
        Main b = new Main();
        Main c = new Main();
        System.out.println(a.count);
        System.out.println(b.count);
        System.out.println(Main.count);
    }
}`,
    explanation:
      "Le champ 'count' est static, donc partagé entre toutes les instances. Chaque appel au constructeur incrémente le même compteur. Après 3 instanciations, count vaut 3. a.count, b.count et Main.count pointent tous vers le même champ static.",
    answers: [
      { text: '3\n3\n3', isCorrect: true },
      { text: '1\n2\n3', isCorrect: false },
      { text: '1\n1\n3', isCorrect: false },
      { text: 'Erreur de compilation', isCorrect: false },
    ],
  },
];

async function seed() {
  console.log('🌱 Seeding de la base de données...\n');

  // 1. Insérer les catégories
  console.log('📁 Insertion des catégories...');
  const insertedCategories: Record<string, number> = {};

  for (const cat of seedCategories) {
    const result = await db
      .insert(categories)
      .values({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      })
      .returning({ id: categories.id });

    insertedCategories[cat.slug] = result[0].id;
    console.log(`   ✓ ${cat.name} (id: ${result[0].id})`);
  }

  // 2. Insérer les questions et réponses
  console.log('\n❓ Insertion des questions et réponses...');

  for (const q of seedQuestions) {
    const categoryId = insertedCategories[q.category];
    if (!categoryId) {
      console.error(`   ✗ Catégorie inconnue: ${q.category}`);
      continue;
    }

    const questionResult = await db
      .insert(questions)
      .values({
        categoryId,
        difficulty: q.difficulty,
        questionText: q.questionText,
        codeSnippet: q.codeSnippet,
        explanation: q.explanation,
      })
      .returning({ id: questions.id });

    const questionId = questionResult[0].id;

    for (let i = 0; i < q.answers.length; i++) {
      await db.insert(answers).values({
        questionId,
        text: q.answers[i].text,
        isCorrect: q.answers[i].isCorrect,
        displayOrder: i,
      });
    }

    const diffLabel = { 1: 'Facile', 2: 'Difficile', 3: 'GOAT' }[q.difficulty];
    console.log(`   ✓ [${q.category}][${diffLabel}] ${q.questionText.substring(0, 60)}...`);
  }

  console.log('\n✅ Seed terminé !');
  console.log(
    `   ${seedCategories.length} catégories, ${seedQuestions.length} questions insérées.`,
  );

  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Erreur lors du seed:', err);
  process.exit(1);
});
