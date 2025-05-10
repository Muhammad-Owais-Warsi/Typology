import { createClient } from "@supabase/supabase-js";
import { uniqueId } from "./uniqueId";

class DB {
  #supabase;
  constructor() {
    this.#supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_KEY,
    );
  }

  async createUser(email) {
    let id = uniqueId();
    let mail = email;

    console.log(id , mail)

    const { error } = await this.#supabase
      .from("users")
      .insert({ id: id, email: mail });

    return error
      ? { success: null, error: error }
      : { success: id, error: null };
  }

  async getUser(email) {
    const { data, error } = await this.#supabase
      .from("users")
      .select()
      .eq("email", email);

    console.log(email, data)

    return error
      ? { success: null, error: error }
      : { success: data, error: null };
  }

  async updateUser(email, wpm, correctWords, errors, totalWords) {
    correctWords = parseInt(correctWords);
    errors = parseInt(errors);
    totalWords = parseInt(totalWords);

    const accuracy = correctWords / totalWords;
    let score = (accuracy * wpm).toFixed(2);
    score = String(score);

    const { error } = await this.#supabase
      .from("users")
      .update({ elo: score })
      .eq("email", email);

    return error
      ? { success: null, error: error }
      : { success: "updated user successfully", error: null };
  }
}


const db = new DB()

export default db;
