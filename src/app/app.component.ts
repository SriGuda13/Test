import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileComponentComponent } from "./components/profile-component/profile-component.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, ProfileComponentComponent, ProfileComponentComponent, HttpClientModule],
    providers: [HttpClientModule]
})
export class AppComponent {
  title = 'test';
}
