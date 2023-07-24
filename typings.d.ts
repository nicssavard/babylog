type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string | null;
};

type Baby = {
  id: string;
  name: string;
  birthDate: Date;
  image: string;
  userId: string;
};

type Sleep = {
  id: string;
  babyId: string;
  milk: number;
  start: Date;
  end: Date;
  durationMinutes: number;
};

type Nap = {
  id: string;
  babyId: string;
  milk: number;
  start: Date;
  end: Date;
  durationMinutes: number;
};
