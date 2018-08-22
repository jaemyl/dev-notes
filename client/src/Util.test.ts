import Util from './Util'

describe('util', () => {
    describe('date functions', () => {
        it.skip('check date behaviours', () => {
            const date1 = new Date('2004-10-12') // in GMT
            const date2 = new Date(2004, 9, 12) // in local time
            const date3 = new Date('2004-1-1')  // in local time
            const date4 = new Date('2004-01-01') // in GMT
            console.log('date1:' + date1.toString())
            console.log('date2:' + date2.toString())
            console.log('date3:' + date3.toString())
            console.log('date4:' + date4.toString())
            expect(date1.toString()).toEqual(date2.toString())
        })
    
        /////////////////////////////////////////////////////////////////
        // testing getNextDate() 
        it('next date of 2004-10-12 should be 2004-10-13', () => {
            const date = Util.getNextDate('2004-10-12')
            expect(date).toEqual('2004-10-13')
        })
        
        it('next date of 2004-08-31 should be 2004-09-01', () => {
            const date = Util.getNextDate('2004-08-31')    
            expect(date).toEqual('2004-09-01')
        })
        
        it('next date of 2004-09-30 should be 2004-10-01', () => {
            const date = Util.getNextDate('2004-09-30')
            expect(date).toEqual('2004-10-01')
        })
        
        it('next date of 2004-10-31 should be 2004-11-01', () => {
            const date = Util.getNextDate('2004-10-31')
            expect(date).toEqual('2004-11-01')
        })
        
        it('next date of 2004-12-31 should be 2005-01-01', () => {
            const date = Util.getNextDate('2004-12-31')
            expect(date).toEqual('2005-01-01')
        })
        
        it('next date of 2018-11-04 should be 2018-11-05', () => {
            const date = Util.getNextDate('2018-11-04')
            expect(date).toEqual('2018-11-05')
        })
    
        /////////////////////////////////////////////////////////////////
        // testing getPrevDate() 
        it('prev date of 2004-10-12 should be 2004-10-11', () => {
            const date = Util.getPrevDate('2004-10-12')
            expect(date).toEqual('2004-10-11')
        })
        
        it('prev date of 2004-09-01 should be 2004-08-31', () => {
            const date = Util.getPrevDate('2004-09-01')    
            expect(date).toEqual('2004-08-31')
        })
        
        it('prev date of 2004-10-01 should be 2004-09-30', () => {
            const date = Util.getPrevDate('2004-10-01')
            expect(date).toEqual('2004-09-30')
        })
        
        it('prev date of 2004-11-01 should be 2004-10-31', () => {
            const date = Util.getPrevDate('2004-11-01')
            expect(date).toEqual('2004-10-31')
        })
        
        it('prev date of 2005-01-01 should be 2004-12-31', () => {
            const date = Util.getPrevDate('2005-01-01')
            expect(date).toEqual('2004-12-31')
        })
        
        it('prev date of 2018-11-05 should be 2018-11-04', () => {
            const date = Util.getPrevDate('2018-11-05')
            expect(date).toEqual('2018-11-04')
        })
    })

    describe('prompt functions', () => {
        it('next unique prompt for the month', () => {
            const journals = {
                '2004-10-05': { prompt: 'aaa' },
                '2004-10-10': { prompt: 'ddd' },
                '2004-10-25': { prompt: 'ccc' },
            }
            const prompts = [
                'aaa',
                'bbb',
                'ccc',
                'ddd'
            ]
            const prompt = Util.getPrompt(journals, prompts, '2004-10-12')
            expect(prompt).toEqual('bbb')
        })
    })
})

