import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostViewComponent } from './post-view.component';
import { PostViewRoutingModule } from './post-view-routing.module';
import { AppHeaderModule } from '@coreui/angular';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/shared/settings.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
    declarations: [PostViewComponent],
    imports: [
        CommonModule,
        AppHeaderModule,
        BsDropdownModule.forRoot(),
        PostViewRoutingModule
    ]
})
export class PostViewModule {}
