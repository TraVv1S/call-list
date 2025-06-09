export interface Call {
  id: number;
  in_out: 1 | 0;
  date: string;
  person_id: number;
  person_avatar: string;
  from_number: string;
  to_number: string;
  source: string;
  partner_data: {
    id: string;
    name: string;
    phone: string;
  };
  time: string;
  duration: string;
  status: "Дозвонился" | "Не дозвонился";
  record: string;
  partnership_id: number;
}
