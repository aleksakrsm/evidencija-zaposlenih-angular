export interface Page<T> {
    content: T[];          
    totalPages: number;    
    totalElements: number; 
    size: number;          
    number: number;        
    numberOfElements: number; 
    first: boolean;        
    last: boolean;         
    empty: boolean;        
    pageable?: Pageable;   
    sort?: Sort;           
  }
  
  export interface Pageable {
    pageNumber: number;    
    pageSize: number;      
    offset: number;        
    unpaged: boolean;      
    paged: boolean;        
    sort: Sort;            
  }
  
  export interface Sort {
    sorted: boolean;       
    unsorted: boolean;     
    empty: boolean;        
  }