import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
// import { FullCalendarModule } from '@fullcalendar/angular';
import { TabMenuModule } from 'primeng/tabmenu';
import { ColorPickerModule } from 'primeng/colorpicker';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { FileUploadModule } from 'primeng/fileupload';
import { SelectButtonModule } from 'primeng/selectbutton';
import { EditorModule } from 'primeng/editor';
import { DividerModule } from 'primeng/divider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { ListboxModule } from 'primeng/listbox';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { DropdownModule } from 'primeng/dropdown';
import { ChipModule } from 'primeng/chip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TagService } from './app/_services/tag.service';
import { ClientService } from './app/_services/client.service';
import { CommunicationService } from './app/_services/communicaton.service';
import { httpInterceptorProviders } from './app/_helpers/http.interceptor';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(AutoCompleteModule, FormsModule, ChipModule, DropdownModule, AppRoutingModule, FormsModule, ReactiveFormsModule, CardModule, PanelModule, ButtonModule, ReactiveFormsModule, InputTextareaModule, TableModule, TagModule, RatingModule, MenuModule, DialogModule, AvatarModule, SidebarModule, MultiSelectModule, BadgeModule, MenuModule, RippleModule, ListboxModule, CalendarModule, ConfirmDialogModule, ChipsModule, InputGroupAddonModule, InputGroupModule, MessagesModule, BrowserModule
        // Message ,
        ,CheckboxModule, 
        // OrderListModule,
        RadioButtonModule, DividerModule, EditorModule, SelectButtonModule, FileUploadModule, ButtonModule, BadgeModule, ProgressBarModule, ToastModule, CommonModule, ColorPickerModule, DropdownModule, TabMenuModule),
        httpInterceptorProviders,
        CommunicationService,
        ClientService,
        TagService,
        MessageService,
        MessageService,
        ConfirmationService,
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));