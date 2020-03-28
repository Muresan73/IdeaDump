import { Observable } from 'rxjs';

type asyncType<T> = {
  [P in keyof React.HTMLAttributes<T>]: Observable<React.HTMLAttributes<T>[P]>;
};

declare module 'react' {
  export interface HTMLAttributes<T> {
    asyncProps?: asyncType<T>;
  }
}
