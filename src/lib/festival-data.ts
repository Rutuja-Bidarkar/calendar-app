export interface Festival {
  day: number;
  month: number;
  name: string;
}

export const festivals: Festival[] = [
  { day: 1, month: 0, name: "New Year's Day" },
  { day: 14, month: 0, name: "Makar Sankranti" },
  { day: 26, month: 0, name: "Republic Day" },
  { day: 14, month: 1, name: "Valentine's Day" },
  { day: 8, month: 2, name: "Women's Day" },
  { day: 25, month: 2, name: "Holi" },
  { day: 14, month: 3, name: "Ambedkar Jayanti" },
  { day: 1, month: 4, name: "May Day" },
  { day: 21, month: 5, name: "Yoga Day" },
  { day: 15, month: 7, name: "Independence Day" },
  { day: 5, month: 8, name: "Teacher's Day" },
  { day: 2, month: 9, name: "Gandhi Jayanti" },
  { day: 31, month: 9, name: "Diwali" },
  { day: 14, month: 10, name: "Children's Day" },
  { day: 25, month: 11, name: "Christmas" },
];
