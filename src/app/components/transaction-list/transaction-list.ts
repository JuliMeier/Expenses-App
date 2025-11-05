import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction';
import { Router } from '@angular/router';



@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css'
})

export class TransactionList implements OnInit {

  transactions : Transaction[] = [];

  constructor(private transactionService : TransactionService, private router : Router) { }

  ngOnInit(): void {
   this.loadTransactions();
  } 

  loadTransactions(): void {
    this.transactionService.getAll().subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (e) => console.error(e)
    }); 
  }

   getTotalIncome(): number {
      return this.transactions
        .filter(t => t.type === 'Income')
        .reduce((sum, t) => sum + t.amount, 0);
    }
    getTotalExpense(): number {
      return this.transactions
        .filter(t => t.type === 'Expense')
        .reduce((sum, t) => sum + t.amount, 0);
    }

    getBalance(): number {
      return this.getTotalIncome() - this.getTotalExpense();
    }

    editTransaction(id: number): void {
      // Lógica para editar la transacción
      console.log('Editar transacción con ID:', id);
      this.router.navigate(['/edit/', id]);
    }

    deleteTransaction(id: number): void {
      if (confirm('¿Estás seguro de que deseas eliminar esta transacción?')) {
        this.transactionService.delete(id).subscribe({
          next: () => {
            console.log('Transacción eliminada con ID:', id);
            this.loadTransactions(); // Recargar la lista después de eliminar
          },
          error: (e) => console.error(e)
        });
    }}  
}

