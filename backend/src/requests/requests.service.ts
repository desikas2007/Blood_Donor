import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRequestDto } from "./dto/create-request.dto";

@Injectable()
export class RequestsService {
  private requests: Array<any> = [];

  create(dto: CreateRequestDto) {
    const request = {
      id: "r" + Date.now(),
      ...dto,
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.requests.push(request);
    return request;
  }

  findByDonor(donorId: string) {
    return this.requests.filter((r) => r.donor_id === donorId);
  }

  findByRequester(requesterId: string) {
    return this.requests.filter((r) => r.requester_id === requesterId);
  }

  updateStatus(id: string, status: string) {
    const index = this.requests.findIndex((r) => r.id === id);
    if (index === -1) throw new NotFoundException("Request not found");
    this.requests[index] = {
      ...this.requests[index],
      status,
      updated_at: new Date().toISOString(),
    };
    return this.requests[index];
  }
}
