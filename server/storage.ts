import { z } from 'zod';

// Define a interface de armazenamento
export interface IStorage {
  // Definições genéricas para operações CRUD
  getAll: <T>(collection: string) => Promise<T[]>;
  getById: <T>(collection: string, id: string) => Promise<T | null>;
  create: <T>(collection: string, data: T) => Promise<T>;
  update: <T>(collection: string, id: string, data: Partial<T>) => Promise<T | null>;
  delete: (collection: string, id: string) => Promise<boolean>;
}

// Implementação de armazenamento em memória
export class MemStorage implements IStorage {
  private storage: Record<string, Record<string, any>> = {};

  constructor() {
    this.storage = {};
  }

  async getAll<T>(collection: string): Promise<T[]> {
    if (!this.storage[collection]) {
      this.storage[collection] = {};
    }
    return Object.values(this.storage[collection]) as T[];
  }

  async getById<T>(collection: string, id: string): Promise<T | null> {
    if (!this.storage[collection] || !this.storage[collection][id]) {
      return null;
    }
    return this.storage[collection][id] as T;
  }

  async create<T>(collection: string, data: T): Promise<T> {
    if (!this.storage[collection]) {
      this.storage[collection] = {};
    }
    
    // Assumindo que o dado tem um id
    const typedData = data as T & { id: string };
    this.storage[collection][typedData.id] = typedData;
    
    return typedData;
  }

  async update<T>(collection: string, id: string, data: Partial<T>): Promise<T | null> {
    if (!this.storage[collection] || !this.storage[collection][id]) {
      return null;
    }
    
    this.storage[collection][id] = {
      ...this.storage[collection][id],
      ...data
    };
    
    return this.storage[collection][id] as T;
  }

  async delete(collection: string, id: string): Promise<boolean> {
    if (!this.storage[collection] || !this.storage[collection][id]) {
      return false;
    }
    
    delete this.storage[collection][id];
    return true;
  }
}

// Exporta uma instância da classe de armazenamento em memória
export const memStorage = new MemStorage();
