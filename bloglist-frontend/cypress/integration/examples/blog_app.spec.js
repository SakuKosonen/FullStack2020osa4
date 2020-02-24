describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')

      const user = {
        name: 'Saku Luukkainen',
        username: 'saku',
        password: 'saku'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user) 

      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.contains('blog')
        cy.contains('Login')
        cy.get('#username')
        cy.get('#password')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
           // cy.contains('login').click()
            cy.get('#username').type('saku')
            cy.get('#password').type('saku')
            cy.get('#login-button').click()
        
            cy.contains('logged in')
        })
    
        it('fails with wrong credentials', function() {
           // cy.contains('login').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
        
            cy.contains('wrong username or password')
        })

        describe.only('when logged in', function() {
            beforeEach(function() {
              cy.login({ username: 'saku', password: 'saku' })
            })
          
            it('a new blog can be created', function() {
                cy.contains('create new blog').click()
                cy.get('#title').type('Sakun super blogi')
                cy.get('#author').type('Saku')
                cy.get('#url').type('testi.fasa')
                cy.get('#create-button').click()
    
                cy.contains('Sakun super blogi')
            })

            it('a new blog can be liked', function() {
                cy.contains('create new blog').click()
                cy.get('#title').type('Sakun super blogi')
                cy.get('#author').type('Saku')
                cy.get('#url').type('testi.fasa')
                cy.get('#create-button').click()
    
                cy.contains('view').click()
                cy.contains('like').click()

                cy.contains('1')
            })

            it('a new blog can be removed', function() {
                cy.contains('create new blog').click()
                cy.get('#title').type('Sakun super blogi')
                cy.get('#author').type('Saku')
                cy.get('#url').type('testi.fasa')
                cy.get('#create-button').click()
    
                cy.contains('view').click()
                cy.contains('remove').click()

                
                
            })

            it('blogs are sorted right', function() {
                cy.contains('create new blog').click()
                cy.get('#title').type('Sakun super blogi')
                cy.get('#author').type('Saku')
                cy.get('#url').type('testi.fasa')
                cy.get('#create-button').click()
    
                

                cy.contains('create new blog').click()
                cy.get('#title').type('Mikon tylsä blogi')
                cy.get('#author').type('Mikko')
                cy.get('#url').type('testi.fasa')
                cy.get('#create-button').click()

                cy.contains('Mikon tylsä blogi').parent().contains('view').click()

                cy.contains('Mikon tylsä blogi').parent().contains('like').click()

                cy.wait(3000)

                cy.contains('Mikon tylsä blogi').parent().contains('like').click()

                cy.wait(3000)

                cy.get('#formal').first().contains('Mikon tylsä blogi')

                



                


                
            })

        })

        /*describe('when logged in', function() {
            beforeEach(function() {
              cy.login({ username: 'saku', password: 'saku' })
            })
            it('a new blog can be created', function() {
                cy.get('#title').type('Sakun super blogi')
                cy.get('#author').type('Saku')
                cy.get('#url').type('testi.fasa')
                cy.get('#create-button').click()

                cy.contains('view').click()
            })
        })*/
       /* it('A blog can be created', function() {
            cy.get('#username').type('saku')
            cy.get('#password').type('saku')
            cy.get('#login-button').click()

           
            cy.contains('create new blog').click()
            cy.get('#title').type('Sakun super blogi')
            cy.get('#author').type('Saku')
            cy.get('#url').type('testi.fasa')
            cy.get('#create-button').click()

            cy.contains('Sakun super blogi')


          })*/
      })

    
  })