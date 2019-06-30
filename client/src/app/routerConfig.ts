import { Routes } from '@angular/router';
import { GraphComponent } from './graph/graph.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

export const appRoutes: Routes = [
    {
        path: 'graph',
        component: GraphComponent
    },
    {
        path: '',
        component: FileUploadComponent
    }
];
