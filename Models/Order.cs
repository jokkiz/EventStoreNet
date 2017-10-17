using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EventStore.Models {
    public class Order {
        [BindNever]
        public long OrderId {get;set;}
        [Required]
        public string Name {get;set;}
        public IEnumerable<CartLine> Events {get;set;}
        [Required]
        public string Address {get;set;}
        [Required]
        public Payment Payment {get;set;}
        [BindNever]
        public bool Shipped {get;set;}
    }
    public class CartLine {
        [BindNever]
        public long CartLineId {get;set;}
        [Required]
        public long EventId {get;set;}
        [Required]
        public int Quantity {get;set;}
    }
    
    public class Payment {
        [BindNever]
        public long PaymentId {get;set;}
        [Required]
        public string CardNumber {get;set;}
        [Required]
        public string CardExpired {get;set;}
        [Required]
        public int CardSecurityCode {get;set;}
        [BindNever]
        public decimal Total {get;set;}
        [BindNever]
        public string AuthCode {get;set;}
    }
}