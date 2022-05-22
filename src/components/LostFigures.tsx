import React from 'react';
import { Figure } from "../models/figures/Figure";

interface LostFiguresProps {
    title: string;
    figures: Figure[]
}

const LostFigures: React.FC<LostFiguresProps> = ({ title, figures }) => {
    return (
        <div className='lost'>
            <h3>
                { title }
            </h3>
            {
                figures.length > 0 &&
                figures.map(figure =>
                    <div key={ figure.id }>
                        { figure.name } { figure.logo && <img className='lost-figure' src={ figure.logo }/> }
                    </div>
                )
            }
        </div>
    );
};

export default LostFigures;
