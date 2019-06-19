
interface IUserProps {
  userId: string;
  name?: string;
  email?: string;
  avatar?: string;
  title?: string;
  description?: string;
  country?: string;
}

export class User {
  public readonly PartitionKey: string;
  public readonly RowKey: string;
  public readonly name: string;
  public readonly email: string;
  public readonly avatar: string;
  public readonly title: string;
  public readonly description: string;
  public readonly country: string;

  constructor(data: IUserProps) {
    Object.assign(this, data);
    this.PartitionKey = data.userId;
    this.RowKey = data.email;
  }
}
