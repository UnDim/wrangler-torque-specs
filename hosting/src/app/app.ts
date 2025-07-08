import { Component } from '@angular/core';
import { ModelService, Model } from './model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [FormsModule]
})
export class App {
  protected title = 'wrangler-torque-specs-366a2';
  models: Model[] = [];
  selectedModel: string = '';
}
