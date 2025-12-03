// Mock data for Admin Area - Replace with real API calls in the future
// TODO: Connect to your database/API

export interface TestRecord {
  id: number;
  userName: string;
  userEmail: string;
  partnerName: string;
  userProfile: "D" | "I" | "S" | "C";
  partnerProfile: "D" | "I" | "S" | "C";
  compatibility: number;
  completedAt: string;
  hasPremiumReport: boolean;
  paymentStatus: "paid" | "pending" | "cancelled";
}

export interface Payment {
  id: number;
  userName: string;
  userEmail: string;
  amount: number;
  status: "paid" | "pending" | "cancelled";
  paymentMethod: "pix" | "credit_card" | "boleto";
  createdAt: string;
  paidAt: string | null;
  testId: number;
}

export interface Report {
  id: number;
  testId: number;
  userName: string;
  userEmail: string;
  generatedAt: string;
  downloadCount: number;
  lastDownloadAt: string | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
  testsCompleted: number;
  hasPremiumReport: boolean;
  profile: "D" | "I" | "S" | "C" | null;
}

export const mockAdminData = {
  // Dashboard Stats
  stats: {
    totalUsers: 247,
    completedQuizzes: 189,
    premiumReports: 67,
    pendingPayments: 23,
    revenue: 3343.30,
    pendingRevenue: 1147.70
  },

  // Profile Distribution
  profileDistribution: {
    D: 42,
    I: 68,
    S: 51,
    C: 28
  },

  // All Tests
  tests: [
    {
      id: 1,
      userName: "Ana Silva",
      userEmail: "ana.silva@email.com",
      partnerName: "Pedro Silva",
      userProfile: "I" as const,
      partnerProfile: "S" as const,
      compatibility: 87,
      completedAt: "2024-01-15T14:30:00",
      hasPremiumReport: true,
      paymentStatus: "paid" as const
    },
    {
      id: 2,
      userName: "Carlos Santos",
      userEmail: "carlos.santos@email.com",
      partnerName: "Maria Santos",
      userProfile: "D" as const,
      partnerProfile: "C" as const,
      compatibility: 72,
      completedAt: "2024-01-15T10:20:00",
      hasPremiumReport: true,
      paymentStatus: "paid" as const
    },
    {
      id: 3,
      userName: "Maria Oliveira",
      userEmail: "maria.oliveira@email.com",
      partnerName: "João Oliveira",
      userProfile: "S" as const,
      partnerProfile: "S" as const,
      compatibility: 92,
      completedAt: "2024-01-14T16:45:00",
      hasPremiumReport: false,
      paymentStatus: "pending" as const
    },
    {
      id: 4,
      userName: "João Costa",
      userEmail: "joao.costa@email.com",
      partnerName: "Paula Costa",
      userProfile: "C" as const,
      partnerProfile: "I" as const,
      compatibility: 68,
      completedAt: "2024-01-14T09:15:00",
      hasPremiumReport: true,
      paymentStatus: "paid" as const
    },
    {
      id: 5,
      userName: "Paula Lima",
      userEmail: "paula.lima@email.com",
      partnerName: "Ricardo Lima",
      userProfile: "I" as const,
      partnerProfile: "D" as const,
      compatibility: 81,
      completedAt: "2024-01-13T11:30:00",
      hasPremiumReport: true,
      paymentStatus: "paid" as const
    },
    {
      id: 6,
      userName: "Ricardo Ferreira",
      userEmail: "ricardo.ferreira@email.com",
      partnerName: "Juliana Ferreira",
      userProfile: "D" as const,
      partnerProfile: "S" as const,
      compatibility: 79,
      completedAt: "2024-01-13T14:20:00",
      hasPremiumReport: false,
      paymentStatus: "pending" as const
    },
    {
      id: 7,
      userName: "Juliana Alves",
      userEmail: "juliana.alves@email.com",
      partnerName: "Marcos Alves",
      userProfile: "S" as const,
      partnerProfile: "C" as const,
      compatibility: 85,
      completedAt: "2024-01-12T15:40:00",
      hasPremiumReport: true,
      paymentStatus: "paid" as const
    },
    {
      id: 8,
      userName: "Marcos Rodrigues",
      userEmail: "marcos.rodrigues@email.com",
      partnerName: "Camila Rodrigues",
      userProfile: "C" as const,
      partnerProfile: "I" as const,
      compatibility: 74,
      completedAt: "2024-01-12T10:10:00",
      hasPremiumReport: false,
      paymentStatus: "cancelled" as const
    },
    {
      id: 9,
      userName: "Camila Souza",
      userEmail: "camila.souza@email.com",
      partnerName: "Bruno Souza",
      userProfile: "I" as const,
      partnerProfile: "I" as const,
      compatibility: 88,
      completedAt: "2024-01-11T13:25:00",
      hasPremiumReport: true,
      paymentStatus: "paid" as const
    },
    {
      id: 10,
      userName: "Bruno Martins",
      userEmail: "bruno.martins@email.com",
      partnerName: "Fernanda Martins",
      userProfile: "D" as const,
      partnerProfile: "D" as const,
      compatibility: 76,
      completedAt: "2024-01-11T16:50:00",
      hasPremiumReport: false,
      paymentStatus: "pending" as const
    },
    {
      id: 11,
      userName: "Fernanda Lima",
      userEmail: "fernanda.lima@email.com",
      partnerName: "Gabriel Lima",
      userProfile: "S" as const,
      partnerProfile: "I" as const,
      compatibility: 84,
      completedAt: "2024-01-10T12:15:00",
      hasPremiumReport: true,
      paymentStatus: "paid" as const
    },
    {
      id: 12,
      userName: "Gabriel Pereira",
      userEmail: "gabriel.pereira@email.com",
      partnerName: "Amanda Pereira",
      userProfile: "C" as const,
      partnerProfile: "S" as const,
      compatibility: 80,
      completedAt: "2024-01-10T09:30:00",
      hasPremiumReport: true,
      paymentStatus: "paid" as const
    }
  ] as TestRecord[],

  // Payments
  payments: [
    {
      id: 1,
      userName: "Ana Silva",
      userEmail: "ana.silva@email.com",
      amount: 49.90,
      status: "paid" as const,
      paymentMethod: "pix" as const,
      createdAt: "2024-01-15T14:35:00",
      paidAt: "2024-01-15T14:36:00",
      testId: 1
    },
    {
      id: 2,
      userName: "Carlos Santos",
      userEmail: "carlos.santos@email.com",
      amount: 49.90,
      status: "paid" as const,
      paymentMethod: "credit_card" as const,
      createdAt: "2024-01-15T10:25:00",
      paidAt: "2024-01-15T10:26:00",
      testId: 2
    },
    {
      id: 3,
      userName: "Maria Oliveira",
      userEmail: "maria.oliveira@email.com",
      amount: 49.90,
      status: "pending" as const,
      paymentMethod: "boleto" as const,
      createdAt: "2024-01-14T16:50:00",
      paidAt: null,
      testId: 3
    },
    {
      id: 4,
      userName: "João Costa",
      userEmail: "joao.costa@email.com",
      amount: 49.90,
      status: "paid" as const,
      paymentMethod: "pix" as const,
      createdAt: "2024-01-14T09:20:00",
      paidAt: "2024-01-14T09:21:00",
      testId: 4
    },
    {
      id: 5,
      userName: "Paula Lima",
      userEmail: "paula.lima@email.com",
      amount: 49.90,
      status: "paid" as const,
      paymentMethod: "pix" as const,
      createdAt: "2024-01-13T11:35:00",
      paidAt: "2024-01-13T11:36:00",
      testId: 5
    },
    {
      id: 6,
      userName: "Ricardo Ferreira",
      userEmail: "ricardo.ferreira@email.com",
      amount: 49.90,
      status: "pending" as const,
      paymentMethod: "boleto" as const,
      createdAt: "2024-01-13T14:25:00",
      paidAt: null,
      testId: 6
    },
    {
      id: 7,
      userName: "Juliana Alves",
      userEmail: "juliana.alves@email.com",
      amount: 49.90,
      status: "paid" as const,
      paymentMethod: "credit_card" as const,
      createdAt: "2024-01-12T15:45:00",
      paidAt: "2024-01-12T15:46:00",
      testId: 7
    },
    {
      id: 8,
      userName: "Marcos Rodrigues",
      userEmail: "marcos.rodrigues@email.com",
      amount: 49.90,
      status: "cancelled" as const,
      paymentMethod: "boleto" as const,
      createdAt: "2024-01-12T10:15:00",
      paidAt: null,
      testId: 8
    },
    {
      id: 9,
      userName: "Camila Souza",
      userEmail: "camila.souza@email.com",
      amount: 49.90,
      status: "paid" as const,
      paymentMethod: "pix" as const,
      createdAt: "2024-01-11T13:30:00",
      paidAt: "2024-01-11T13:31:00",
      testId: 9
    },
    {
      id: 10,
      userName: "Bruno Martins",
      userEmail: "bruno.martins@email.com",
      amount: 49.90,
      status: "pending" as const,
      paymentMethod: "boleto" as const,
      createdAt: "2024-01-11T16:55:00",
      paidAt: null,
      testId: 10
    },
    {
      id: 11,
      userName: "Fernanda Lima",
      userEmail: "fernanda.lima@email.com",
      amount: 49.90,
      status: "paid" as const,
      paymentMethod: "pix" as const,
      createdAt: "2024-01-10T12:20:00",
      paidAt: "2024-01-10T12:21:00",
      testId: 11
    },
    {
      id: 12,
      userName: "Gabriel Pereira",
      userEmail: "gabriel.pereira@email.com",
      amount: 49.90,
      status: "paid" as const,
      paymentMethod: "credit_card" as const,
      createdAt: "2024-01-10T09:35:00",
      paidAt: "2024-01-10T09:36:00",
      testId: 12
    }
  ] as Payment[],

  // Generated Reports
  reports: [
    {
      id: 1,
      testId: 1,
      userName: "Ana Silva",
      userEmail: "ana.silva@email.com",
      generatedAt: "2024-01-15T14:36:30",
      downloadCount: 3,
      lastDownloadAt: "2024-01-16T10:20:00"
    },
    {
      id: 2,
      testId: 2,
      userName: "Carlos Santos",
      userEmail: "carlos.santos@email.com",
      generatedAt: "2024-01-15T10:26:30",
      downloadCount: 1,
      lastDownloadAt: "2024-01-15T10:30:00"
    },
    {
      id: 3,
      testId: 4,
      userName: "João Costa",
      userEmail: "joao.costa@email.com",
      generatedAt: "2024-01-14T09:21:30",
      downloadCount: 2,
      lastDownloadAt: "2024-01-15T14:15:00"
    },
    {
      id: 4,
      testId: 5,
      userName: "Paula Lima",
      userEmail: "paula.lima@email.com",
      generatedAt: "2024-01-13T11:36:30",
      downloadCount: 5,
      lastDownloadAt: "2024-01-16T08:45:00"
    },
    {
      id: 5,
      testId: 7,
      userName: "Juliana Alves",
      userEmail: "juliana.alves@email.com",
      generatedAt: "2024-01-12T15:46:30",
      downloadCount: 2,
      lastDownloadAt: "2024-01-13T16:20:00"
    },
    {
      id: 6,
      testId: 9,
      userName: "Camila Souza",
      userEmail: "camila.souza@email.com",
      generatedAt: "2024-01-11T13:31:30",
      downloadCount: 4,
      lastDownloadAt: "2024-01-15T11:30:00"
    },
    {
      id: 7,
      testId: 11,
      userName: "Fernanda Lima",
      userEmail: "fernanda.lima@email.com",
      generatedAt: "2024-01-10T12:21:30",
      downloadCount: 1,
      lastDownloadAt: "2024-01-10T15:40:00"
    },
    {
      id: 8,
      testId: 12,
      userName: "Gabriel Pereira",
      userEmail: "gabriel.pereira@email.com",
      generatedAt: "2024-01-10T09:36:30",
      downloadCount: 3,
      lastDownloadAt: "2024-01-14T09:20:00"
    }
  ] as Report[],

  // Users
  users: [
    {
      id: 1,
      name: "Ana Silva",
      email: "ana.silva@email.com",
      phone: "(11) 98765-4321",
      registeredAt: "2024-01-15T14:25:00",
      testsCompleted: 1,
      hasPremiumReport: true,
      profile: "I" as const
    },
    {
      id: 2,
      name: "Carlos Santos",
      email: "carlos.santos@email.com",
      phone: "(11) 97654-3210",
      registeredAt: "2024-01-15T10:15:00",
      testsCompleted: 1,
      hasPremiumReport: true,
      profile: "D" as const
    },
    {
      id: 3,
      name: "Maria Oliveira",
      email: "maria.oliveira@email.com",
      phone: "(11) 96543-2109",
      registeredAt: "2024-01-14T16:40:00",
      testsCompleted: 1,
      hasPremiumReport: false,
      profile: "S" as const
    },
    {
      id: 4,
      name: "João Costa",
      email: "joao.costa@email.com",
      phone: "(11) 95432-1098",
      registeredAt: "2024-01-14T09:10:00",
      testsCompleted: 1,
      hasPremiumReport: true,
      profile: "C" as const
    },
    {
      id: 5,
      name: "Paula Lima",
      email: "paula.lima@email.com",
      phone: "(11) 94321-0987",
      registeredAt: "2024-01-13T11:25:00",
      testsCompleted: 1,
      hasPremiumReport: true,
      profile: "I" as const
    },
    {
      id: 6,
      name: "Ricardo Ferreira",
      email: "ricardo.ferreira@email.com",
      phone: "(11) 93210-9876",
      registeredAt: "2024-01-13T14:15:00",
      testsCompleted: 1,
      hasPremiumReport: false,
      profile: "D" as const
    },
    {
      id: 7,
      name: "Juliana Alves",
      email: "juliana.alves@email.com",
      phone: "(11) 92109-8765",
      registeredAt: "2024-01-12T15:35:00",
      testsCompleted: 1,
      hasPremiumReport: true,
      profile: "S" as const
    },
    {
      id: 8,
      name: "Marcos Rodrigues",
      email: "marcos.rodrigues@email.com",
      phone: "(11) 91098-7654",
      registeredAt: "2024-01-12T10:05:00",
      testsCompleted: 1,
      hasPremiumReport: false,
      profile: "C" as const
    },
    {
      id: 9,
      name: "Camila Souza",
      email: "camila.souza@email.com",
      phone: "(11) 90987-6543",
      registeredAt: "2024-01-11T13:20:00",
      testsCompleted: 1,
      hasPremiumReport: true,
      profile: "I" as const
    },
    {
      id: 10,
      name: "Bruno Martins",
      email: "bruno.martins@email.com",
      phone: "(11) 89876-5432",
      registeredAt: "2024-01-11T16:45:00",
      testsCompleted: 1,
      hasPremiumReport: false,
      profile: "D" as const
    },
    {
      id: 11,
      name: "Fernanda Lima",
      email: "fernanda.lima@email.com",
      phone: "(11) 88765-4321",
      registeredAt: "2024-01-10T12:10:00",
      testsCompleted: 1,
      hasPremiumReport: true,
      profile: "S" as const
    },
    {
      id: 12,
      name: "Gabriel Pereira",
      email: "gabriel.pereira@email.com",
      phone: "(11) 87654-3210",
      registeredAt: "2024-01-10T09:25:00",
      testsCompleted: 1,
      hasPremiumReport: true,
      profile: "C" as const
    }
  ] as User[]
};
