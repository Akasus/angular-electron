import { Observable } from 'rxjs';
import { Page, PageRequest } from '../../../../types';



export type PaginatedEndpoint<T, Q> = (pageable: PageRequest<T>, query: Q) => Observable<Page<T>>;
