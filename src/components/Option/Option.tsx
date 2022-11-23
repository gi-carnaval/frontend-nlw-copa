import styles from './styles.module.scss'

interface Props extends  React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  title: string;
  isSelected: boolean;
}

export function Option({ title, isSelected = false, ...rest }: Props) {
  {console.log(isSelected)}
  return (    
    <button className={styles.buttonOption} {...rest} style={{background: isSelected ?  '#323238'  : 'transparent'}}>
      
      <span>
        <h3>
          {title}
        </h3>
      </span>
    </button>
    
  );
}