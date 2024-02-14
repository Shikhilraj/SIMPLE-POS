

$('#itemerror').hide();
$('#custerror').hide();
$('.invoice').hide()
$('#invoice_table').hide()
$('#table').hide()
$('.invoice_details').hide()
$('#Generate_invoice').hide()

customerlist=[]
var selection=""
addcount=0
prizeid=1;
idlist={};
subtotal=0
total=0
productname_list=[]
prize_list=[]
quantity_list=[]
invoicelist=[]
subtotallist=[]
sublist=[]
let order=[]

$('#addproduct').on('click',function (){
    $('#itemerror').hide();
    addcount=addcount+1
    var item_name=$('#product_name').val();
    var item_prize=$('#prize').val();
    validate=validate_product(item_name,item_prize);
    if (validate){
        $('#ordertable').append(`<tr>
        <td><input type="text" id="${item_name}" value=${item_name}></td>
        <td id="prizeid${prizeid}" class="prizeid" >${item_prize}</td>
        <td><button type="button" data-id=${prizeid} class='delete' >Delete</button></td>
        <td><input type=text class='order_quantity' id= placeholder="Enetr Quantity"> </td>
        <td id ="order_subtotal${prizeid}" disabled></td>
        </tr>`)
        prizeid=prizeid+1;
        
      }
    else{
        $('#itemerror').show();

    }
       
 });


function validate_product(item_name,item_prize){

    console.log("validating")
    if(item_name == ' ' || item_prize == ''){
        $('#itemerror').show();
        $('#itemerror').html("Check the Fields");
        return false;
    }
    else return true;

}


 $('#addcustomer').click(function(){
    $('#custerror').hide();
    var customer_name = $('#cust_name').val()
    if(customer_name == ''){
        $('#custerror').show()
        $('#custerror').html("Customer name must be enter");
    }
    else{
        customerlist.push(customer_name)
        $('#customers').append(`<option>${customer_name}</option>`)
    }
})

$(document).on('click','.delete' ,function () {
    
    console.log($(this).parent());
    addcount=addcount-1;
    $(this).parent().parent().remove();
    
});


$(document).on('blur','.order_quantity',function(){    
    subtotal=0
    prize= ($(this).parent().parent().find('.prizeid:first').text());
    quantity=this.value;        
    console.log("Customers :",customerlist)
    subtotal = prize * quantity;
    subtotallist.push(subtotal)
    $(this).parents().next('td').html(subtotal)
    subtotal_calculation(prize,quantity); 
 })


function subtotal_calculation(prize,quantity){
     subtotal = 0
     console.log(quantity,prize);   
    subtotal = prize * quantity;
    console.log("subtotal :",subtotal)
    total=total+subtotal
    sublist.push(subtotal)

}


   


$('#order').click(function(){
    console.log('Subtotals',sublist)
    $('#invoice_table').empty()
    $('#Generate_invoice').show()
    
    console.log("total",total)
    subtotallist=[]
    productname_list=[]
    quantity_list=[]
    prize_list=[]
    $('#invoice_table').hide()
    $('#table').hide()
    $('.invoice_details').hide()
    if(addcount == 0){
        $('#Generate_invoice').hide()
        Swal.fire({
            icon: "error",
            title: "Oopss...",
            text: "Something went wrong!",
            footer:" "
            });
    }
    selection=($(this).parents().siblings().find('select').val())
    console.log(Selection)
    if ($(this).parents().siblings().find('select').val() == "select"){
        $('#Generate_invoice').hide()
        Swal.fire({
            icon: "error",
            title: "Customer Not selected",
            text: "Something went wrong!",
            footer:" "
            });
    }
    table=$(this).parent().siblings('table').children()
    table.find('tr').each(function(index){
        tds=$(this).find('td')
        if(index != 0){
            if (tds.eq(0)){
                tds_input=tds.find('input')
                productname_list.push(tds_input.val())
            }
            if(tds.eq(1)){
                prize_list.push(tds.eq(1).text())
            }
            if(tds.eq(3)){
                if(tds.find('.order_quantity').val()=="" ||tds.find('.order_quantity').val()==0)
                {  
                    $('#Generate_invoice').hide()
                    console.log("Onty value: ",tds.find('.order_quantity').val())
                    Swal.fire({
                        icon: "error",
                        title: "Select the Quantity",
                        text: "Something went wrong!",
                        footer:" "
                        });
                   
                    }
                quantity_list.push(tds.find('.order_quantity').val())
            }
            if(tds.eq(4)){
                subtotallist.push(tds.eq(3).text());
            }
        }
        console.log("product_name",productname_list)    
   
        console.log("prize",prize_list)
       
        console.log("quantity",quantity_list)
      

    })
    console.log("new table");
    listlenth=productname_list.length
    var id=$('#invoice_table')
    $('#invoice_table').append(`<tr>
                    <th>Product Name</th>
                    <th>Product Quantity</th>
                    <th>Product Prize</th>
                    <th>Subtotal</th></tr>`)
    for (var i=0;i<listlenth;i++){
            subtotal=subtotallist[i]
        $('#invoice_table').append(`<tr><td>${productname_list[i]}</td><td>${quantity_list[i]}</td><td>${prize_list[i]}</td><td>${sublist[i]}</td></tr>`)
    }
    console.log("Subtotallist",subtotallist)
    console.log($('#invoice_table').data())
    displayorder();


})
$('#Generate_invoice').click( function(){
    $('#invoice_date').empty();
    $('#invoice_customer').empty()

    var currentDate=new Date()
    var formattedDate = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate();
    console.log(formattedDate)
    $('#invoice_date').html(formattedDate);
    $('#invoice_customer').html(selection)
    $('#invoice_total').html(total)
    $('.invoice_details').show()

})
function displayorder(){
    $('#table').empty();
    data=$('#invoice_table').html();
    console.log(data)
    $('#table').append(data)
    console.log("table",table)

}








