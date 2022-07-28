type Message = {
  id?: number;
  address: string;
  message: string;
  created_at: Date;
  key?: string | number;
};

export default Message;
