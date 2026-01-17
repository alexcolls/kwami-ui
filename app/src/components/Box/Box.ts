import './Box.css'
import { Title } from '../Title/Title'

interface BoxProps {
  title: string;
  content: string;
  id: string;
}

export function Box({ title, content, id }: BoxProps): string {
  return `
    <div class="kwami-box" data-box-id="${id}">
      <div class="kwami-box-title">${Title(title)}</div>
      <div class="kwami-box-content" data-component="${id}">
        ${content}
      </div>
    </div>
  `;
}
