import React from 'react';

export const materialSamples = [
  {
    code: 'MAT-WLT-01',
    name: 'WALNUT',
    spec: 'Select Hardwood Veneer',
    tone: '#5C4033',
    finish: 'Ultra-Matte Hardwax'
  },
  {
    code: 'MAT-OAK-02',
    name: 'WHITE OAK',
    spec: 'Quarter-Sawn Solid',
    tone: '#CBB296',
    finish: 'Neutral Low-Sheen'
  },
  {
    code: 'MAT-ASH-03',
    name: 'ASH',
    spec: 'Straight Grain Hardwood',
    tone: '#E3DAC9',
    finish: 'Clear Protective Oil'
  },
  {
    code: 'MAT-MDF-04',
    name: 'CALIBRATED MDF',
    spec: 'High-Density Engineered',
    tone: '#D2B48C',
    finish: 'Raw / Lacquer Ready'
  }
];

const MaterialSwatch = ({ compact = false }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] text-warm-gray tracking-wider uppercase">
          WORKSHOP SUBSTRATE SPECIFICATIONS
        </span>
        <span className="font-mono text-[10px] text-walnut">
          GRADE-A STANDARDS
        </span>
      </div>
      <div className={`grid ${compact ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'} gap-2.5`}>
        {materialSamples.map((mat) => (
          <div
            key={mat.code}
            className="border border-hairline bg-paper p-2.5 flex flex-col justify-between hover:border-walnut transition-colors duration-150"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[9px] text-warm-gray">{mat.code}</span>
              <div 
                className="w-3.5 h-3.5 rounded-none border border-hairline"
                style={{ backgroundColor: mat.tone }}
                title={mat.name}
              />
            </div>
            <div>
              <div className="font-mono text-xs font-semibold text-charcoal tracking-wide">
                {mat.name}
              </div>
              <div className="text-[10px] text-warm-gray leading-tight mt-0.5">
                {mat.spec}
              </div>
              <div className="font-mono text-[9px] text-walnut mt-1.5 border-t border-hairline pt-1">
                {mat.finish}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialSwatch;
