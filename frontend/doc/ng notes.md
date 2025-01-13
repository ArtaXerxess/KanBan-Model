The input handling in the code you provided for the Kanban application is **template-driven forms**, not **reactive forms**.

### How we can tell:

1. **Two-way Binding** (`[(ngModel)]`):
   - In the HTML, you're using the `[(ngModel)]` directive for two-way data binding. This is characteristic of **template-driven forms** in Angular. 
   - Example in the `to-do.component.html`:
     ```html
     <input *ngIf="task.isNew" type="text" class="form-control" [(ngModel)]="task.name" placeholder="Task Name" />
     <textarea *ngIf="task.isNew" [(ngModel)]="task.description" class="form-control" placeholder="Task Description"></textarea>
     ```

   - `[(ngModel)]` is used to bind the value of the input fields (e.g., `task.name` and `task.description`) to the component class properties. This is the key indicator of a template-driven form.

2. **No `FormGroup` or `FormControl` Instances**:
   - In **reactive forms**, you typically use `FormGroup`, `FormControl`, and `FormBuilder` to handle form input, like this:
     ```typescript
     this.form = new FormGroup({
       name: new FormControl(''),
       description: new FormControl('')
     });
     ```
     However, in your code, you do not have `FormGroup` or `FormControl` instances. Instead, you're directly using `ngModel` to bind the inputs to the component’s properties.

3. **Validation**:
   - Template-driven forms allow you to manage validation directly within the template using directives like `required`, `minlength`, etc. For example:
     ```html
     <input [(ngModel)]="task.name" name="taskName" required />
     ```
   - This kind of validation isn’t explicitly visible in your current code, which further indicates the use of template-driven forms.

### Summary:
The code you're working with uses **template-driven forms**, as evidenced by the usage of `[(ngModel)]` for two-way data binding between the template and the component class, without the use of `FormGroup` or `FormControl` from reactive forms.

If you'd like to switch to **reactive forms**, I can guide you on how to implement them instead.