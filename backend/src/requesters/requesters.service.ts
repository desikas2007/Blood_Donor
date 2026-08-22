import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRequesterDto } from "./dto/create-requester.dto";
import { UpdateRequesterDto } from "./dto/update-requester.dto";

@Injectable()
export class RequestersService {
  private requesters: Array<any> = [];

  create(dto: CreateRequesterDto) {
    const requester = {
      id: "req" + Date.now(),
      ...dto,
      created_at: new Date().toISOString(),
    };
    this.requesters.push(requester);
    return requester;
  }

  findOne(id: string) {
    const requester = this.requesters.find((r) => r.id === id);
    if (!requester) throw new NotFoundException("Requester not found");
    return requester;
  }

  update(id: string, dto: UpdateRequesterDto) {
    const index = this.requesters.findIndex((r) => r.id === id);
    if (index === -1) throw new NotFoundException("Requester not found");
    this.requesters[index] = { ...this.requesters[index], ...dto };
    return this.requesters[index];
  }
}
