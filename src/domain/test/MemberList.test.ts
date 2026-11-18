import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import { MemberList } from "../MemberList.ts";

describe("MemberList", () => {
  let list: MemberList;
  let member: Member;

  beforeEach(() => {
    list = new MemberList();
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
    });
  });

  test("Create an empty member list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a member", () => {
    list.add(member);
    expect(list.getItems()).toEqual([member]);
  });

  test("reject a duplicated document id", () => {
    list.add(member);
    expect(() => list.add(member)).toThrow();
  });

  test("total fees", () => {
    list.add(member);
    expect(list.totalFees()).toBe(1500);
  });

  test("total discounted", () => {
    const other = new Member({
      name: "Juan Gómez",
      documentId: "87654321",
      plan: "basic",
      monthlyFee: 500,
    });
    member.monthlyFee = 1000;
    member.discount = 10;
    list.add(member);
    list.add(other);
    expect(list.totalDiscounted()).toBe(1400);
  });

  test("total discounted of an empty list is 0", () => {
    expect(list.totalDiscounted()).toBe(0);
  });

});
